import { useEffect } from "react";
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../shared/ui";
import HighlightText from "@/shared/ui/HighLightText";
import { Post } from "@/entities/post/model/post.types";
import { Comment } from "@/entities/comment/model/comment.type";
import { addCommentApi, deleteCommentApi, likeCommentApi, updateCommentApi } from "@/entities/comment/api";
import useUrl from "@/shared/lib/useUrl";
import { useModalStore } from "@/shared/model/useModalStore";
import useLoadingStore from "@/features/post/model/useLoadingStore";
import usePostStore from "@/features/post/model/usePostStore";
import useCommentStore from "@/features/commnet/model/useCommentsStore";
import useUserStore from "@/features/user/model/useUserStore";
import useFetchPosts from "@/features/post/model/useFetchPosts";
import useFetchTag from "@/features/post/model/useFetchTag";
import useFetchPostsByTag from "@/features/post/model/useFetchPostsByTag";
import useUpdatePost from "@/features/post/model/useUpdatePost";
import useAddPosts from "@/features/post/model/useAddPosts";
import PostTable from "@/widgets/post/ui/PostTable";
import Loading from "@/shared/ui/Loading";
import PostHeader from "@/features/post/ui/PostHeader";
import PostSearch from "@/features/post/ui/PostSearch";
import PostFilter from "@/features/post/ui/PostFilter";
import PostPageNations from "@/features/post/ui/PostPageNations";

const PostsManager = () => {
  const { total, skip, limit, searchQuery, sortBy, sortOrder, selectedTag, setSkip, setLimit, updateURL } = useUrl();

  const { loading } = useLoadingStore();
  const { selectedPost, newPost, setSelectedPost, setNewPost } = usePostStore();
  const { comments, selectedComment, newComment, setComments, setSelectedComment, setNewComment } = useCommentStore();
  const { selectedUser } = useUserStore();

  const {
    showAddDialog,
    showEditDialog,
    showAddCommentDialog,
    showEditCommentDialog,
    showPostDetailDialog,
    showUserDialog,
    setShowAddDialog,
    setShowEditDialog,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setShowPostDetailDialog,
    setShowUserDialog,
  } = useModalStore();

  const { fetchPosts } = useFetchPosts();
  const { fetchTags } = useFetchTag();
  const { fetchPostsByTag } = useFetchPostsByTag();
  const { updatePost } = useUpdatePost();
  const { addPosts } = useAddPosts();

  // 댓글 추가 (댓글추가 대화상자에서 실행)
  const addComment = async () => {
    try {
      const data = await addCommentApi(newComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));

      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
  };

  // 댓글 업데이트 (댓글 수정 대화상자)
  const updateComment = async () => {
    try {
      const data = await updateCommentApi(selectedComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));

      setShowEditCommentDialog(false);
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    }
  };

  // 댓글 삭제 (게시물 상세 보기 대화상자->renderComments->댓글 삭제)
  const deleteComment = async (id: number, postId: number) => {
    try {
      await deleteCommentApi(id);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  // 댓글 좋아요 (댓글에서 볼 수 있음 (renderComments))
  const likeComment = async (id: Comment["id"], postId: Post["id"]) => {
    const targetComment = comments[postId].find((c) => c.id === id);
    if (!targetComment) return;

    try {
      const data = await likeCommentApi(id, targetComment);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  // 댓글 렌더링 (게시물 상세 보기 대화상자에서 렌더링)
  const renderComments = (postId: Post["id"]) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }));
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment);
                  setShowEditCommentDialog(true);
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <PostSearch />
            <PostFilter />
          </div>

          {loading ? <Loading /> : <PostTable />}

          <PostPageNations />
        </div>
      </CardContent>
      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={() => addPosts(newPost)}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => setSelectedPost((prev) => (prev ? { ...prev, title: e.target.value } : null))}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => setSelectedPost((prev) => (prev ? { ...prev, body: e.target.value } : null))}
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment((prev) => (prev ? { ...prev, body: e.target.value } : null))}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              <HighlightText text={selectedPost?.title || ""} highlight={searchQuery} />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <HighlightText text={selectedPost?.body || ""} highlight={searchQuery} />
            </p>

            {renderComments(selectedPost?.id || 0)}
          </div>
        </DialogContent>
      </Dialog>
      {/* 사용자 모달 */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              <HighlightText text={selectedPost?.title || ""} highlight={searchQuery} />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostsManager;

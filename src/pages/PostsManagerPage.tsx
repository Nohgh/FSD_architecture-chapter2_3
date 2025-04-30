import { useEffect, useState } from "react";
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "../shared/ui";
import { Modal } from "../shared/ui/Modal";
import HighlightText from "@/shared/ui/HighLightText";
import { NewPost, Post } from "@/entities/post/model/post.types";
import { Comment, NewComment } from "@/entities/comment/model/comment.type";
import { User } from "@/entities/user/model/user.types";
import {
  addPostApi,
  deletePostApi,
  fetchPostsByTagApi,
  getPostApi,
  searchPostApi,
  updatePostApi,
} from "@/entities/post/api";
import { Tag } from "@/entities/tag/model/tag.types";
import { fetchTagsApi } from "@/entities/tag/api";
import { fetchUser, fetchUserById } from "@/entities/user/api";
import {
  addCommentApi,
  deleteCommentApi,
  fetchCommentsApi,
  likeCommentApi,
  updateCommentApi,
} from "@/entities/comment/api";

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });

  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));

  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");

  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");

  const [comments, setComments] = useState<{ [key: Post["id"]]: Comment[] }>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 });

  // 게시물 추가 대화상자
  const [showAddDialog, setShowAddDialog] = useState(false);
  // 게시물 수정 대화상자
  const [showEditDialog, setShowEditDialog] = useState(false);
  // 댓글 추가 대화상자
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  // 댓글 수정 대화상자
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  // 게시물 상세 보기 대화상자
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  // 유저 모달
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // URL 업데이트 함수 (useEffect[skip,...],태그 선택시 실행)
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 게시물 가져오기 (검색결과, 선택된 태그,태그가 전체일때 실행 )
  const fetchPosts = async () => {
    // 게시물 가져오기 (검색결과, 선택된 태그, 태그가 전체일 때 실행)
    setLoading(true);
    try {
      const postsData = await getPostApi(limit, skip); // getPost 함수 사용

      const users = await fetchUser();
      const usersData: User[] = users.users;

      const postsWithUsers: Post[] = postsData.posts.map((post: Post) => {
        const author = usersData.find((user) => user.id === post.userId);
        return author ? { ...post, author } : { ...post };
      });

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 태그 가져오기 (앱 렌더링시 useEffect로 인해 실행)
  const fetchTags = async () => {
    try {
      const data = await fetchTagsApi();
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const response = await searchPostApi(searchQuery);

      setPosts(response.posts);
      setTotal(response.total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    }
    setLoading(false);
  };

  // 태그별 게시물 가져오기 (태그 선택시 실행)
  const fetchPostsByTag = async (tag: Post["tags"][number]) => {
    if (!tag || tag === "all") {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const postsData = await fetchPostsByTagApi(tag);
      const usersData = await fetchUser();

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error);
    }
    setLoading(false);
  };

  // 게시물 추가
  const addPosts = async () => {
    try {
      const response = await addPostApi(newPost);
      setPosts([response, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  // 게시물 업데이트 (게시물 수정 대화상자에서 게시물 업데이트)
  const updatePost = async () => {
    try {
      const data = await updatePostApi(selectedPost);
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  // 게시물 삭제 (삭제버튼 클릭시)
  const deletePost = async (id: number) => {
    try {
      await deletePostApi(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 댓글 가져오기 (게시글 상세보기에서 실행 (이거는 메세지버튼에서 실행))
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await fetchCommentsApi(postId);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

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

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserById(user);
      setSelectedUser(userData);

      setShowUserDialog(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };
  //계층별로 뭘 만들지를 구두로 정리, 하고 진행하면 도움이 된다.

  useEffect(() => {
    fetchTags();
  }, []);

  //태그 선택 여부에 따라, 태그별 게시물 가져오기,게시물 가져오기를 수행합니다. 또한 URL을 업데이트 합니다.
  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  //location이 바뀌면 초기화
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  // 게시물 테이블 렌더링 (로딩 여부에 따라 실행)
  const renderPostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>
                  <HighlightText text={post.title} highlight={searchQuery} />
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag);
                        updateURL();
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

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
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value);
                fetchPostsByTag(value);
                updateURL();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
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
            <Button onClick={addPosts}>게시물 추가</Button>
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
      {/* 사용자 모달 */}{" "}
      <Modal open={showUserDialog} onOpenChange={setShowUserDialog} title="사용자 정보">
        <>
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
        </>
      </Modal>
    </Card>
  );
};

export default PostsManager;

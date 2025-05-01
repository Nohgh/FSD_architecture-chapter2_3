import { likeCommentApi } from "@/entities/comment/api";
import { Comment } from "@/entities/comment/model/comment.type";
import { Post } from "@/entities/post/model/post.types";
import useCommentStore from "./useCommentsStore";

const useLikeComment = () => {
  const { comments, setComments } = useCommentStore();

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

  return { likeComment };
};
export default useLikeComment;

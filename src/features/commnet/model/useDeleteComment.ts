import { deleteCommentApi } from "@/entities/comment/api";
import useCommentStore from "./useCommentsStore";

const useDeleteComment = () => {
  const { setComments } = useCommentStore();

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
  return { deleteComment };
};

export default useDeleteComment;

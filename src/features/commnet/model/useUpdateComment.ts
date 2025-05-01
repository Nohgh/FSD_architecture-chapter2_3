import { updateCommentApi } from "@/entities/comment/api";
import useCommentStore from "./useCommentsStore";
import { useModalStore } from "@/shared/model/useModalStore";

const useUpdateComments = () => {
  const { setComments, selectedComment } = useCommentStore();
  const { setShowEditCommentDialog } = useModalStore();

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

  return { updateComment };
};
export default useUpdateComments;

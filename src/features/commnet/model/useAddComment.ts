import { addCommentApi } from "@/entities/comment/api";
import useCommentStore from "./useCommentsStore";
import { useModalStore } from "@/shared/model/useModalStore";

const useAddComment = () => {
  const { newComment, setComments, setNewComment } = useCommentStore();
  const { setShowAddCommentDialog } = useModalStore();

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
  return { addComment };
};

export default useAddComment;

import { useMutation } from "@tanstack/react-query";
import { updateCommentApi } from "@/entities/comment/api";
import { useModalStore } from "@/shared/model/useModalStore";
import useCommentStore from "./useCommentsStore";

const useUpdateComments = () => {
  const { setComments, selectedComment } = useCommentStore();
  const { setShowEditCommentDialog } = useModalStore();

  const { mutate: updateComment } = useMutation({
    mutationFn: async () => {
      if (!selectedComment) throw new Error("선택된 댓글이 없습니다.");

      const data = await updateCommentApi(selectedComment);
      return data;
    },

    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));

      setShowEditCommentDialog(false);
    },

    onError: (error) => {
      console.error("댓글 업데이트 오류:", error);
    },
  });

  return { updateComment };
};

export default useUpdateComments;

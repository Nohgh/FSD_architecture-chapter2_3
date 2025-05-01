import { useMutation } from "@tanstack/react-query";
import { addCommentApi } from "@/entities/comment/api";
import useCommentStore from "./useCommentsStore";
import { useModalStore } from "@/shared/model/useModalStore";

const useAddComment = () => {
  const { newComment, setComments, setNewComment } = useCommentStore();
  const { setShowAddCommentDialog } = useModalStore();

  const { mutate: addComment } = useMutation({
    mutationFn: async () => {
      const data = await addCommentApi(newComment);
      return data;
    },

    onSuccess: (data) => {
      // 댓글 추가 후 상태 업데이트
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));

      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
    },

    onError: (error) => {
      console.error("댓글 추가 오류:", error);
    },
  });

  return { addComment };
};

export default useAddComment;

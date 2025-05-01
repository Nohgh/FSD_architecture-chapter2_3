import { useMutation } from "@tanstack/react-query";
import { deleteCommentApi } from "@/entities/comment/api";
import useCommentStore from "./useCommentsStore";

const useDeleteComment = () => {
  const { setComments } = useCommentStore();

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (id: number) => {
      await deleteCommentApi(id);
      return id;
    },

    onSuccess: (id) => {
      setComments((prev) => {
        const updatedComments = { ...prev };

        Object.keys(updatedComments).forEach((postId) => {
          updatedComments[postId] = updatedComments[postId].filter((comment) => comment.id !== id);
        });

        return updatedComments;
      });
    },

    onError: (error) => {
      console.error("댓글 삭제 오류:", error);
    },
  });

  return { deleteComment };
};

export default useDeleteComment;

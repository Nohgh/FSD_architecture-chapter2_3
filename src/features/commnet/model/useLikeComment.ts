import { useMutation } from "@tanstack/react-query";
import { likeCommentApi } from "@/entities/comment/api";
import { Comment } from "@/entities/comment/model/comment.type";
import { Post } from "@/entities/post/model/post.types";
import useCommentStore from "./useCommentsStore";

const useLikeComment = () => {
  const { comments, setComments } = useCommentStore();

  const mutation = useMutation({
    mutationFn: ({ commentId, postId }: { commentId: Comment["id"]; postId: Post["id"] }) => {
      const targetComment = comments[postId].find((c) => c.id === commentId);
      if (!targetComment) throw new Error("댓글을 찾을 수 없습니다.");

      return likeCommentApi(commentId, targetComment);
    },

    onSuccess: (data, variables) => {
      const { postId } = variables;

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
    },

    onError: (error) => {
      console.error("댓글 좋아요 오류:", error);
    },
  });

  return {
    likeComment: (commentId: Comment["id"], postId: Post["id"]) => mutation.mutate({ commentId, postId }),
  };
};

export default useLikeComment;

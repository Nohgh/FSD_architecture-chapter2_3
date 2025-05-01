import { useQueryClient } from "@tanstack/react-query";
import { fetchCommentsApi } from "@/entities/comment/api";
import useCommentsStore from "./useCommentsStore";

const useFetchComments = () => {
  const { setComments } = useCommentsStore();
  const queryClient = useQueryClient();

  const fetchComments = async (postId: number) => {
    const cachedComments = queryClient.getQueryData(["comments", postId]);
    if (cachedComments) return;

    try {
      const data = await fetchCommentsApi(postId);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
      queryClient.setQueryData(["comments", postId], data.comments);
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  return { fetchComments };
};

export default useFetchComments;

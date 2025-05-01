import { fetchCommentsApi } from "@/entities/comment/api";
import useCommentsStore from "./useCommentsStore";

const useFetchComments = () => {
  const { comments, setComments } = useCommentsStore();

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return;

    try {
      const data = await fetchCommentsApi(postId);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  return { fetchComments };
};

export default useFetchComments;

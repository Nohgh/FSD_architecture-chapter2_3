import { fetchCommentsApi } from "@/entities/comment/api";
import useCommentsStore from "./useCommentsStore";

// 댓글 가져오기 (게시글 상세보기에서 실행 (이거는 메세지버튼에서 실행))
const useFetchComments = () => {
  const { comments, setComments } = useCommentsStore();

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음

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

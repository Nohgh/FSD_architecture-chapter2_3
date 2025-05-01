import useQueryParams from "@/shared/lib/useQueryParams";
import useFetchPosts from "./useFetchPosts";
import useLoadingStore from "./useLoadingStore";
import { searchPostApi } from "@/entities/post/api";
import usePostStore from "./usePostStore";

const useSearchPosts = () => {
  const { setTotal } = useQueryParams();
  const { fetchPosts } = useFetchPosts();
  const { setLoading } = useLoadingStore();
  const { setPosts } = usePostStore();

  const searchPosts = async (searchQuery: string) => {
    if (!searchQuery) {
      console.log("searchQuery", searchQuery);
      console.log("return");
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const response = await searchPostApi(searchQuery);

      setPosts(response.posts);
      setTotal(response.total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    }
    setLoading(false);
  };

  return { searchPosts };
};

export default useSearchPosts;

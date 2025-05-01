import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { mutate: searchPosts } = useMutation({
    mutationFn: async (searchQuery: string) => {
      if (!searchQuery) {
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
      } finally {
        setLoading(false);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (error) => {
      console.error("게시물 검색 오류:", error);
    },
  });

  return { searchPosts };
};

export default useSearchPosts;

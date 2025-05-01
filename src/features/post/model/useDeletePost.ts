import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "@/entities/post/api";
import usePostStore from "./usePostStore";

const useDeletePost = () => {
  const { posts, setPosts } = usePostStore();
  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationFn: (id: number) => deletePostApi(id),

    onSuccess: (_, id) => {
      setPosts(posts.filter((post) => post.id !== id));

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (error) => {
      console.error("게시물 삭제 오류:", error);
    },
  });

  return { deletePost };
};

export default useDeletePost;

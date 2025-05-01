import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/shared/model/useModalStore";
import usePostStore from "./usePostStore";
import { updatePostApi } from "@/entities/post/api";

const useUpdatePost = () => {
  const { posts, selectedPost, setPosts } = usePostStore();
  const { setShowEditDialog } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: updatePost } = useMutation({
    mutationFn: async () => {
      if (!selectedPost) return;
      try {
        const data = await updatePostApi(selectedPost);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error("게시물 업데이트 오류");
      }
    },

    onSuccess: (data) => {
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));

      queryClient.invalidateQueries({
        queryKey: ["posts"] as const,
      });
      setShowEditDialog(false);
    },

    onError: (error) => {
      console.error("게시물 업데이트 오류:", error);
    },
  });

  return { updatePost };
};

export default useUpdatePost;

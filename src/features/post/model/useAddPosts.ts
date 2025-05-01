import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostApi } from "@/entities/post/api";
import { NewPost } from "@/entities/post/model/post.types";
import usePostStore from "./usePostStore";
import { useModalStore } from "@/shared/model/useModalStore";

const useAddPosts = () => {
  const { posts, setPosts, setNewPost } = usePostStore();
  const { setShowAddDialog } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: addPosts } = useMutation({
    mutationFn: (newPost: NewPost) => addPostApi(newPost),

    onSuccess: (newPost) => {
      setPosts([newPost, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (error) => {
      console.error("게시물 추가 오류:", error);
    },
  });

  return { addPosts };
};

export default useAddPosts;

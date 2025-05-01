import { addPostApi } from "@/entities/post/api";
import { NewPost } from "@/entities/post/model/post.types";
import usePostStore from "./usePostStore";
import { useModalStore } from "@/shared/model/useModalStore";

const useAddPosts = () => {
  const { posts, setPosts, setNewPost } = usePostStore();
  const { setShowAddDialog } = useModalStore();

  const addPosts = async (newPost: NewPost) => {
    try {
      const response = await addPostApi(newPost);
      setPosts([response, ...posts]);

      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };
  return { addPosts };
};
export default useAddPosts;

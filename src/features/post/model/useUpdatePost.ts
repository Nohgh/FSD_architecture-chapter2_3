import { useModalStore } from "@/shared/model/useModalStore";
import usePostStore from "./usePostStore";
import { updatePostApi } from "@/entities/post/api";

const useUpdatePost = () => {
  const { posts, selectedPost, setPosts } = usePostStore();
  const { setShowEditDialog } = useModalStore();

  const updatePost = async () => {
    try {
      const data = await updatePostApi(selectedPost);
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  return { updatePost };
};
export default useUpdatePost;

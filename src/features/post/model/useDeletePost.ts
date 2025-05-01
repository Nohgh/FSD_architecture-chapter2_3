import { deletePostApi } from "@/entities/post/api";
import usePostStore from "./usePostStore";

// 게시물 삭제 (삭제버튼 클릭시)
const useDeletePost = () => {
  const { posts, setPosts } = usePostStore.getState();

  const deletePost = async (id: number) => {
    try {
      await deletePostApi(id);

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  return { deletePost };
};

export default useDeletePost;

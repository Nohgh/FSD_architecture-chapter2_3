import useQueryParams from "@/shared/lib/useQueryParams";
import { Post } from "@/entities/post/model/post.types";
import { fetchUser } from "@/entities/user/api";
import { User } from "@/entities/user/model/user.types";
import { fetchPostsByTagApi } from "@/entities/post/api";
import useFetchPosts from "./useFetchPosts";
import useLoadingStore from "./useLoadingStore";
import usePostStore from "./usePostStore";

const useFetchPostsByTag = () => {
  const { fetchPosts } = useFetchPosts();
  const { setLoading } = useLoadingStore();
  const { setPosts } = usePostStore();
  const { setTotal } = useQueryParams();

  const fetchPostsByTag = async (tag: Post["tags"][number]) => {
    if (!tag || tag === "all") {
      fetchPosts();
      return;
    }

    setLoading(true);

    try {
      const postsData = await fetchPostsByTagApi(tag);
      const usersData = await fetchUser();

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));
      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error);
    }
    setLoading(false);
  };
  return { fetchPostsByTag };
};

export default useFetchPostsByTag;

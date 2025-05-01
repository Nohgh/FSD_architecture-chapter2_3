import { getPostApi } from "@/entities/post/api";
import { Post } from "@/entities/post/model/post.types";
import { fetchUser } from "@/entities/user/api";
import { User } from "@/entities/user/model/user.types";
import useQueryParams from "@/shared/lib/useQueryParams";
import usePostStore from "./usePostStore";
import useLoadingStore from "./useLoadingStore";

const useFetchPosts = () => {
  const { skip, limit, setTotal } = useQueryParams();
  const { setPosts } = usePostStore();
  const { setLoading } = useLoadingStore();

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const postsData = await getPostApi(limit, skip);

      const users = await fetchUser();
      const usersData: User[] = users.users;

      const postsWithUsers: Post[] = postsData.posts.map((post: Post) => {
        const author = usersData.find((user) => user.id === post.userId);
        return author ? { ...post, author } : { ...post };
      });

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchPosts };
};

export default useFetchPosts;

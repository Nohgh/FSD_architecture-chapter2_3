import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "@/entities/post/api";
import { fetchUser } from "@/entities/user/api";
import { Post } from "@/entities/post/model/post.types";
import { User } from "@/entities/user/model/user.types";
import useQueryParams from "@/shared/lib/useQueryParams";
import usePostStore from "./usePostStore";
import useLoadingStore from "./useLoadingStore";
import { useEffect } from "react";

const useFetchPosts = () => {
  const { skip, limit, setTotal } = useQueryParams();
  const { setPosts } = usePostStore();
  const { setLoading } = useLoadingStore();

  const queryKey = ["posts", limit, skip];

  const { data, refetch, error, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const [postsData, users] = await Promise.all([getPostApi(limit, skip), fetchUser()]);

      const usersData: User[] = users.users;

      const postsWithUsers: Post[] = postsData.posts.map((post: Post) => {
        const author = usersData.find((user) => user.id === post.userId);
        return author ? { ...post, author } : post;
      });

      return { posts: postsWithUsers, total: postsData.total };
    },
    enabled: false,
  });

  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
      setTotal(data.total);
    }
  }, [data, setPosts, setTotal]);

  useEffect(() => {
    if (error) {
      console.error("게시물 가져오기 오류:", error);
    }
  }, [error]);

  return { fetchPosts: refetch };
};

export default useFetchPosts;

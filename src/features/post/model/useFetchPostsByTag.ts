import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/entities/user/api";
import { fetchPostsByTagApi } from "@/entities/post/api";
import { Post } from "@/entities/post/model/post.types";
import { User } from "@/entities/user/model/user.types";
import useQueryParams from "@/shared/lib/useQueryParams";
import usePostStore from "./usePostStore";
import useLoadingStore from "./useLoadingStore";
import useFetchPosts from "./useFetchPosts";
import { useEffect } from "react";

const useFetchPostsByTag = () => {
  const { setPosts } = usePostStore();
  const { setTotal } = useQueryParams();
  const { setLoading } = useLoadingStore();
  const { fetchPosts } = useFetchPosts();

  const {
    data,
    error,
    isPending,
    refetch: fetchPostsByTagInternal,
  } = useQuery({
    queryKey: ["postsByTag"],
    queryFn: async () => {
      if (!currentTag || currentTag === "all") {
        return null;
      }

      const [postsData, usersData] = await Promise.all([fetchPostsByTagApi(currentTag), fetchUser()]);

      const postsWithUsers: Post[] = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

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
      console.error("태그별 게시물 가져오기 오류:", error);
    }
  }, [error]);

  let currentTag: Post["tags"][number] = "all";

  const fetchPostsByTag = async (tag: Post["tags"][number]) => {
    currentTag = tag;

    if (!tag || tag === "all") {
      fetchPosts();
    } else {
      await fetchPostsByTagInternal();
    }
  };

  return { fetchPostsByTag };
};

export default useFetchPostsByTag;

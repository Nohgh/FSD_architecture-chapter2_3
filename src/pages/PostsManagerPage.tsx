import { useEffect } from "react";
import { Card as PostManage } from "../shared/ui";
import useUrl from "@/shared/lib/useUrl";
import useFetchPosts from "@/features/post/model/useFetchPosts";
import useFetchTag from "@/features/post/model/useFetchTag";
import useFetchPostsByTag from "@/features/post/model/useFetchPostsByTag";
import PostHeader from "@/features/post/ui/PostHeader";
import PostContent from "@/widgets/post/PostContent";
import ModalWrapper from "@/widgets/modal/ModalWrapper";

const PostsManager = () => {
  //lib
  const { skip, limit, sortBy, sortOrder, selectedTag, updateURL } = useUrl();

  //hooks
  const { fetchTags } = useFetchTag();
  const { fetchPostsByTag } = useFetchPostsByTag();

  const { fetchPosts } = useFetchPosts();

  //side effects
  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  return (
    <PostManage className="w-full max-w-6xl mx-auto">
      <PostHeader />
      <PostContent />
      <ModalWrapper />
    </PostManage>
  );
};

export default PostsManager;

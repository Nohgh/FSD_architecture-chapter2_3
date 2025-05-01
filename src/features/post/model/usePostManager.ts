import useUrl from "@/shared/lib/useUrl";
import useFetchTag from "./useFetchTag";
import useFetchPostsByTag from "./useFetchPostsByTag";
import useFetchPosts from "./useFetchPosts";
import { useEffect } from "react";

/**
 * @description 포스트 관리 기능을 제공하는 커스텀 훅.
 * - URL 파라미터에 따라 Pos 불러오기
 * - 태그 목록을 초기화
 */
const usePostManager = () => {
  const { skip, limit, sortBy, sortOrder, selectedTag, updateURL } = useUrl();

  const { fetchTags } = useFetchTag();
  const { fetchPostsByTag } = useFetchPostsByTag();
  const { fetchPosts } = useFetchPosts();

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
};

export default usePostManager;

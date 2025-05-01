import { useQuery } from "@tanstack/react-query";
import { fetchTagsApi } from "@/entities/tag/api";
import useTagStore from "./useTagStore";
import { useEffect } from "react";

const useFetchTag = () => {
  const { setTags } = useTagStore();

  const {
    data,
    error,
    isPending,
    refetch: fetchTags,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTagsApi,
  });

  useEffect(() => {
    if (data) {
      setTags(data);
    }
  }, [data, setTags]);

  useEffect(() => {
    if (error) {
      console.error("태그 가져오기 오류:", error);
    }
  }, [error]);

  return { fetchTags, isLoading: isPending };
};

export default useFetchTag;

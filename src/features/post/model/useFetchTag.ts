import { fetchTagsApi } from "@/entities/tag/api";
import useTagStore from "./useTagStore";

const useFetchTag = () => {
  const { setTags } = useTagStore();

  const fetchTags = async () => {
    try {
      const data = await fetchTagsApi();
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  return { fetchTags };
};
export default useFetchTag;

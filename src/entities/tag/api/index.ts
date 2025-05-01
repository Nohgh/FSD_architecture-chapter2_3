import { API } from "@/shared/lib/apiMode";
import { Tag } from "../model/tag.types";

export const fetchTagsApi = async (): Promise<Tag[]> => {
  const response = await fetch(`${API}/posts/tags`);

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

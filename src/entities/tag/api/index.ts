import { Tag } from "../model/tag.types";

export const fetchTagsApi = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags");

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

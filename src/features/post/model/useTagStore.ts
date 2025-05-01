import { Tag } from "@/entities/tag/model/tag.types";
import { create } from "zustand";

interface TagStore {
  tags: Tag[];
  setTags: (tag: Tag[]) => void;
}

const useTagStore = create<TagStore>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags: tags }),
}));

export default useTagStore;

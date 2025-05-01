import { Tag } from "@/entities/tag/model/tag.types";
import { create } from "zustand";
// const [tags, setTags] = useState<Tag[]>([]);
// const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");

interface TagStore {
  tags: Tag[];
  setTags: (tag: Tag[]) => void;
}

const useTagStore = create<TagStore>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags: tags }),
}));

export default useTagStore;

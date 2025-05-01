import { NewPost, Post } from "@/entities/post/model/post.types";
import { create } from "zustand";

interface PostStore {
  posts: Post[];
  selectedPost: Post | null;
  newPost: NewPost;

  setPosts: (posts: Post[]) => void;
  setSelectedPost: (updater: Post | null | ((prev: Post | null) => Post | null)) => void;
  setNewPost: (newPost: NewPost) => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  selectedPost: null,
  newPost: { title: "", body: "", userId: 1 },

  setPosts: (posts: Post[]) => set({ posts: posts }),
  setNewPost: (newPost) => set({ newPost: newPost }),
  setSelectedPost: (updater) =>
    set((state) => ({
      selectedPost: typeof updater === "function" ? updater(state.selectedPost) : updater,
    })),
}));

export default usePostStore;

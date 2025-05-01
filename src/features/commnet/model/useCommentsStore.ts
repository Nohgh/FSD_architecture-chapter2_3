import { create } from "zustand";
import { Post } from "@/entities/post/model/post.types";
import { Comment } from "@/entities/comment/model/comment.type";

interface CommentStore {
  comments: { [key: Post["id"]]: Comment[] };
  setComments: (updater: (prev: { [key: Post["id"]]: Comment[] }) => { [key: Post["id"]]: Comment[] }) => void;
}

const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  setComments: (updater) =>
    set((state) => ({
      comments: updater(state.comments),
    })),
}));

export default useCommentStore;

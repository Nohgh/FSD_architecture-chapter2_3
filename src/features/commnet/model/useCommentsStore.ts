import { create } from "zustand";
import { Post } from "@/entities/post/model/post.types";
import { Comment, NewComment } from "@/entities/comment/model/comment.type";

interface CommentStore {
  comments: { [key: Post["id"]]: Comment[] };
  selectedComment: Comment | null;
  newComment: NewComment;

  setComments: (updater: (prev: { [key: Post["id"]]: Comment[] }) => { [key: Post["id"]]: Comment[] }) => void;
  setSelectedComment: (selectedComment: Comment | ((prev: Comment | null) => Comment | null)) => void;
  setNewComment: (newComment: NewComment | ((prev: NewComment) => NewComment)) => void;
}

const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },

  setComments: (updater) =>
    set((state) => ({
      comments: updater(state.comments),
    })),

  setSelectedComment: (selectedComment) =>
    set((state) => ({
      selectedComment:
        typeof selectedComment === "function"
          ? (selectedComment as (prev: Comment | null) => Comment | null)(state.selectedComment)
          : selectedComment,
    })),

  setNewComment: (newComment) =>
    set((state) => ({
      newComment:
        typeof newComment === "function"
          ? (newComment as (prev: NewComment) => NewComment)(state.newComment)
          : newComment,
    })),
}));

export default useCommentStore;

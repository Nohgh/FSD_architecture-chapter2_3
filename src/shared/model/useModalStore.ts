import { create } from "zustand";

interface ModalStore {
  showAddDialog: boolean;
  showEditDialog: boolean;
  showAddCommentDialog: boolean;
  showEditCommentDialog: boolean;
  showPostDetailDialog: boolean;
  showUserDialog: boolean;

  setShowAddDialog: (showAddDialog: boolean) => void;
  setShowEditDialog: (showEditDialog: boolean) => void;
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void;
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void;
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void;
  setShowUserDialog: (showUserInfoDialog: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  showAddDialog: false,
  showEditDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserDialog: false,

  setShowAddDialog: (showAddDialog: boolean) => set({ showAddDialog }),
  setShowEditDialog: (showEditDialog: boolean) => set({ showEditDialog }),
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => set({ showAddCommentDialog }),
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => set({ showEditCommentDialog }),
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => set({ showPostDetailDialog }),
  setShowUserDialog: (showUserInfoDialog: boolean) => set({ showUserDialog: showUserInfoDialog }),
}));

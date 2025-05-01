import { create } from "zustand";
import { User } from "@/entities/user/model/user.types";

interface UserStore {
  selectedUser: User | null;
  setSelectedUser: (selectedUser: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),
}));

export default useUserStore;

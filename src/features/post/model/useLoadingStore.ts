import { create } from "zustand";

interface LodingStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LodingStore>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading: loading }),
}));

export default useLoadingStore;

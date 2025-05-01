import { useMutation } from "@tanstack/react-query";
import { fetchUserById } from "@/entities/user/api";
import { User } from "@/entities/user/model/user.types";
import { useModalStore } from "@/shared/model/useModalStore";
import useUserStore from "./useUserStore";

export const useOpenUserModal = () => {
  const { setShowUserDialog } = useModalStore();
  const { setSelectedUser } = useUserStore();

  const { mutate: openUserModal } = useMutation({
    mutationFn: async (user: User) => {
      const userData = await fetchUserById(user);
      return userData;
    },

    onSuccess: (userData) => {
      setSelectedUser(userData);
      setShowUserDialog(true);
    },

    onError: (error) => {
      console.error("사용자 정보 가져오기 오류:", error);
    },
  });

  return { openUserModal };
};

import { fetchUserById } from "@/entities/user/api";
import { User } from "@/entities/user/model/user.types";
import { useModalStore } from "@/shared/model/useModalStore";
import useUserStore from "./useUserStore";

export const useOpenUserModal = () => {
  const { setShowUserDialog } = useModalStore();
  const { setSelectedUser } = useUserStore();

  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserById(user);
      setSelectedUser(userData);

      setShowUserDialog(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };

  return { openUserModal };
};

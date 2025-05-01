import { API } from "@/shared/lib/apiMode";
import { User } from "../model/user.types";

const fetchUser = async () => {
  const response = await fetch(`${API}/users?limit=0&select=username,image`);

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

const fetchUserById = async (user: User) => {
  const response = await fetch(`${API}/users/${user.id}`);

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

export { fetchUser, fetchUserById };

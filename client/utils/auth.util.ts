import { User } from "@/types/data.interface";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const setUserLocally = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

import { CurrentAccount } from "types";
const setItemLocal = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItemLocal = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key);
  if (!item) {
    return undefined;
  }
  return JSON.parse(item as string) as T;
};

const removeItemLocal = (key: string): void => {
  localStorage.removeItem(key);
};
function getUserStorage(): CurrentAccount | null {
  const currentUserLocal = localStorage.getItem("currentUser");
  return currentUserLocal ? JSON.parse(currentUserLocal) : null;
}

function removeUserStorage(): void {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("access_token");
}

function getTokenStorage(): CurrentAccount["token"] {
  return localStorage.getItem("access_token") || null;
}

function setUserStorage(currentUser: CurrentAccount, newToken: CurrentAccount["token"]): void {
  localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, token: newToken }));
  localStorage.setItem("access_token", JSON.stringify(newToken));
}

export { setUserStorage, removeUserStorage, getUserStorage, getTokenStorage, setItemLocal, getItemLocal, removeItemLocal };

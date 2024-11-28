import { CurrentAccount } from "types";

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
export { setUserStorage, removeUserStorage, getUserStorage, getTokenStorage };

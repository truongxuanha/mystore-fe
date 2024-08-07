// import { useState, useEffect } from "react";
// import { UserAccount } from "../types/UserType.type";

// const useAuth = () => {
//   const [user, setUser] = useState<UserAccount | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser.user);
//         setToken(parsedUser.token);
//       } catch (error) {
//         console.error("Error parsing user data from localStorage:", error);
//       }
//     }
//   }, []);

//   const saveAuthData = (userData: UserAccount, token: string) => {
//     setUser(userData);
//     setToken(token);
//     localStorage.setItem(
//       "currentUser",
//       JSON.stringify({ user: userData, token })
//     );
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("currentUser");
//   };

//   return { user, token, saveAuthData, logout };
// };

// export default useAuth;

import { UserAccount } from "types";
import { useAppSelector } from "./useAppDispatch";

const useAuth = (): UserAccount | undefined => {
  const { currentUser } = useAppSelector((state) => state.auth);
 
  return currentUser?.user;
};

export default useAuth;

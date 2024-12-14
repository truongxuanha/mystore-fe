import { AccountTypeEnum } from "types";
import { useAppSelector } from "./useAppDispatch";

const useAuthenticated = (): { isAdmin: boolean; authenticated: boolean } => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const authenticated = !!currentUser?.user;
  const isAdmin = currentUser?.user.permission === AccountTypeEnum.ADMIN || currentUser?.user.permission === AccountTypeEnum.EMPLOYEE;
  return { authenticated, isAdmin };
};

export default useAuthenticated;

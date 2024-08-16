import { useAppSelector } from "./useAppDispatch";

const useAuth = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return currentUser?.user;
};

export default useAuth;

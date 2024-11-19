import { useMediaQuery } from "react-responsive";

export const useDetectScreen = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 979px)` });
  const isBigPc = useMediaQuery({ query: `(min-width: 1170px)` });

  return { isMobile, isBigPc };
};

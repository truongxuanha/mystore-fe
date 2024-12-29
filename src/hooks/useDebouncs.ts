import { useEffect, useState } from "react";

type debounceType = {
  value: string;
  delay: number;
};

function useDebounce({ value, delay }: debounceType) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return debounce;
}

export default useDebounce;

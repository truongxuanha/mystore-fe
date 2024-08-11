import { useEffect, useState } from "react";
interface debounceType {
  value: string;
  delay: number;
}
function useDebounce({ value, delay }: debounceType) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(handler);
  }, [value]);

  return debounce;
}

export default useDebounce;

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [dValue, setDValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return dValue;
}

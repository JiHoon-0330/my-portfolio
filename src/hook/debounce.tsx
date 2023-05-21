import { useEffect, useState } from "react";

export function useDebounce<T extends unknown>(
  defaultValue: T,
  /**
   * ms
   */
  delay: number,
) {
  const [value, setValue] = useState(defaultValue);
  const [delayedValue, setDelayedValue] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return {
    delayedValue,
    value,
    setValue,
  };
}

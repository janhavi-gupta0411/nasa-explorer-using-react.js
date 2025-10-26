import { useEffect, useState } from "react";

/**
 * Debounce hook
 * @param {*} value
 * @param {number} delay ms
 */
export default function useDebounce(value, delay = 450) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

import { useRef, useEffect } from "react";
import { debounce } from "~utils";

export const useDebounce = (action, ms = 500) => {
  const debouncedAction = useRef(null);

  useEffect(() => {
    if (!debouncedAction.current) {
      debouncedAction.current = debounce(action, ms);
    }
  }, []);

  return debouncedAction.current;
};

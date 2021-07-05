import { useRef, useEffect } from "react";

export function useDocumentTitle(title) {
  const prevTitleRef = useRef(title);

  useEffect(() => {
    document.title = title;
    return () => {
      // eslint-disable-next-line
      document.title = prevTitleRef.current;
    };
  }, [title]);
}

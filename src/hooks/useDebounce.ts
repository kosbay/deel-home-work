import { useCallback, useRef } from "react";

const useDebounce = <T extends (...args: any[]) => void>(
  searchQuery: T,
  debounceTime: number
) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const debounceWithAbort = () => {
    let timeoutId: number;
    let abortController: AbortController;

    return function (...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortController = new AbortController();
      abortControllerRef.current = abortController;

      timeoutId = setTimeout(() => {
        searchQuery.apply(null, args);
      }, debounceTime);
    };
  };

  return useCallback(debounceWithAbort(), [searchQuery, debounceTime]);
}

export default useDebounce;

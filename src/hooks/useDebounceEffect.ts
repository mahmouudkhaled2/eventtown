import { useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
function useDebounceEffect<T>(
  value: T,
  delay: number,
  // eslint-disable-next-line no-unused-vars
  callback: (value: T) => void,
): void {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);
}

export default useDebounceEffect;

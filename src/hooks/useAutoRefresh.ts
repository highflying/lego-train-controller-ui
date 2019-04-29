import { useCallback, useState, useEffect, useRef } from "react";

export default function<T>(
  fetch: (...args: any[]) => Promise<T>,
  defaultData: T,
  deps: any[]
): T {
  const timeout = useRef<NodeJS.Timeout>();
  const [data, setData] = useState<T>(defaultData);

  const launchRefresh = useCallback(() => {
    if (timeout.current) {
      return;
    }

    timeout.current = setTimeout(async () => {
      timeout.current = undefined;
      const results = await fetch();
      setData(results);
      launchRefresh();
    }, 1000);
  }, [fetch, ...deps]);

  useEffect(() => {
    if (timeout.current) {
      return;
    }

    launchRefresh();
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  return data || defaultData;
}

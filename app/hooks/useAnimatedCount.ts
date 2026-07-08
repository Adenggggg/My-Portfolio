import { useEffect, useState } from "react";

export function useAnimatedCount(target: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(target) || target <= 0) {
      setCount(0);
      return;
    }
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return count;
}
import { useLayoutEffect, useState } from 'react';

const useRandom = (fn: Function, timing?: number) => {
  const [color, setColor] = useState<string>(fn());

  useLayoutEffect(() => {
    const timerId = setInterval(() => {
      setColor(fn());
    }, timing ?? 1500);

    return () => clearInterval(timerId);
  }, [fn, timing]);

  return color;
};

export default useRandom;

import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    }

    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [end, duration]);

  return count;
}

export default useCountUp;

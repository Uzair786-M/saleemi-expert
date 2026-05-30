import { useState, useEffect, useRef } from "react";

// Counts from 0 to target when element enters viewport
export const AnimatedCounter = ({ target, suffix = "+", duration = 2000 }) => {
  const [count,     setCount]     = useState(0);
  const [started,   setStarted]   = useState(false);
  const ref         = useRef(null);

  useEffect(() => {
    // Use IntersectionObserver to detect when visible on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 } // triggers when 30% of element is visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const numTarget = Number(target) || 0;
    if (numTarget === 0) { setCount(0); return; }

    const steps    = 60;
    const interval = duration / steps;
    let   current  = 0;

    const timer = setInterval(() => {
      current += numTarget / steps;
      if (current >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

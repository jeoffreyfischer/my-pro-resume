import { useState, useEffect } from "react";

/**
 * Returns the number of grid columns for responsive layouts:
 * 1 for mobile (< 640px), 2 for sm–xl (640–1279px), 3 for xl+ (≥ 1280px).
 */
export function useColumnCount(): 1 | 2 | 3 {
  const [cols, setCols] = useState<1 | 2 | 3>(3);
  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const xl = window.matchMedia("(min-width: 1280px)");
    const update = () => {
      if (xl.matches) setCols(3);
      else if (sm.matches) setCols(2);
      else setCols(1);
    };
    update();
    sm.addEventListener("change", update);
    xl.addEventListener("change", update);
    return () => {
      sm.removeEventListener("change", update);
      xl.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

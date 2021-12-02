import { debounce } from "lodash";
import { useEffect, useState } from "react";

const getSize = () => {
  return [window.innerWidth, window.innerHeight];
};
export const useWindowSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
    const handler = debounce(() => {
      setSize(getSize());
    }, 300);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return size;
};

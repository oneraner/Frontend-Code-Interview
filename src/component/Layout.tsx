import { ReactNode, useEffect, useRef, useState } from "react";
import Menu from "./Menu";

export default function Layout({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const childrenRef = useRef(null);
  const DEBOUNCE_TIME = 500;

  useEffect(() => {
    if (!isVisible) return;
    const time = setTimeout(() => {
      setIsDebouncing(false);
      setIsVisible(false);
    }, DEBOUNCE_TIME);
    return () => clearTimeout(time);
  }, [isVisible, isDebouncing]);

  const handleScroll = () => {
    if (isDebouncing) return;
    setIsVisible(true);
  };

  return (
    <div>
      <header
        className={`container flex text-center py-2 px-4 fixed top-0 left-1/2 -translate-x-1/2 bg-white ${isVisible ? "hidden" : ""}`}
      >
        <Menu />
        <p className="flex-1 flex justify-center items-center">Jedi Software</p>
      </header>
      <div
        ref={childrenRef}
        className="h-[calc(100vh_-_48px)] overflow-scroll pt-10"
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
}

import { useEffect, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionState("exit");
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionState("enter");
        window.scrollTo(0, 0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [children, location.pathname]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        transitionState === "enter"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;

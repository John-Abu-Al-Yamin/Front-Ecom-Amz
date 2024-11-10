import { createContext, useState, useContext, useEffect } from "react";

export const Window = createContext("");

const WindowContext = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const setWindowWidth = () => setWindowSize(window.innerWidth); // Corrected here
    window.addEventListener("resize", setWindowWidth);
    return () => window.removeEventListener("resize", setWindowWidth);
  }, []);

  const value = { windowSize, setWindowSize };

  return <Window.Provider value={value}>{children}</Window.Provider>;
};

export const useWidthContext = () => useContext(Window);

export default WindowContext;

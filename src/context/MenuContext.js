import { createContext, useState, useContext } from "react";

export const Menu = createContext("");

const MenuContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);




  const value = { isOpen, setIsOpen };

  return <Menu.Provider value={value}>{children}</Menu.Provider>;
};

export const useMainContext = () => useContext(Menu);

export default MenuContext;

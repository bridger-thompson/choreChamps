import { FC, ReactNode, createContext, useState } from "react";
import { Child } from "../models/Child";

export const ChildContext = createContext<ChildContextType>({
  selectChild: () => { }
});

export type ChildContextType = {
  selectedChild?: Child;
  selectChild: (child: Child) => void;
}

const ChildProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const child = localStorage.getItem("selectedChild")
  const [selectedChild, setSelectedChild] = useState<Child>(child ? JSON.parse(child) : undefined)
  const selectChild = (child: Child) => {
    setSelectedChild(child)
    localStorage.setItem("selectedChild", JSON.stringify(child))
  }
  return (
    <ChildContext.Provider value={{ selectedChild, selectChild }}>
      {children}
    </ChildContext.Provider>
  )
}

export default ChildProvider;


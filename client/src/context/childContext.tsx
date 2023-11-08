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
  const [selectedChild, setSelectedChild] = useState<Child>()
  const selectChild = (child: Child) => {
    setSelectedChild(child)
  }
  return (
    <ChildContext.Provider value={{ selectedChild, selectChild }}>
      {children}
    </ChildContext.Provider>
  )
}

export default ChildProvider;


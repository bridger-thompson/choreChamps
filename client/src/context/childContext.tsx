import { FC, ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { Child } from "../models/Child";
import { useGetChildrenQuery } from "../hooks/childHooks";

export const ChildContext = createContext<ChildContextType>({
  selectChild: () => { }
});

export type ChildContextType = {
  selectedChildId?: number;
  selectChild: (child: Child) => void;
}

const ChildProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const childrenQuery = useGetChildrenQuery()
  const child = localStorage.getItem("selectedChild")
  const [selectedChild, setSelectedChild] = useState<Child>(child ? JSON.parse(child) : undefined)
  const selectChild = useCallback((child: Child) => {
    setSelectedChild(child)
    localStorage.setItem("selectedChild", JSON.stringify(child))
  }, [])

  useEffect(() => {
    if (!selectedChild && childrenQuery.data && childrenQuery.data.length > 0) {
      selectChild(childrenQuery.data[0])
    }
  }, [childrenQuery.data, selectChild, selectedChild])

  return (
    <ChildContext.Provider value={{ selectedChildId: selectedChild?.id, selectChild }}>
      {children}
    </ChildContext.Provider>
  )
}

export default ChildProvider;


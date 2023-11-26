import { useContext, useEffect } from "react"
import { Child } from "../models/Child"
import { SelectInput, useSelectInput } from "./forms/SelectInput"
import { ChildContext } from "../context/childContext"
import { useGetChildrenQuery } from "../hooks/childHooks"
import { Spinner } from "./ui/Spinner"

export const ChildSelect = () => {
  const { selectedChildId: selectedChildId, selectChild } = useContext(ChildContext)
  const childrenQuery = useGetChildrenQuery();
  const children = childrenQuery.data;

  const childControl = useSelectInput({
    initialValue: children?.find(c => c.id === selectedChildId),
    options: children ?? [],
    getKey: (c: Child) => c.name,
    setValueCallback: (c?: Child) => {
      if (c) {
        selectChild(c)
      }
    }
  })

  useEffect(() => {
    if (!selectedChildId && children && children.length > 0) {
      selectChild(children[0])
      childControl.setValue(children[0].name)
    }
  }, [selectedChildId, children, selectChild, childControl])

  if (childrenQuery.isLoading) return <Spinner />
  if (childrenQuery.isError) return <h3 className="text-center">Error getting children</h3>

  return (
    <SelectInput control={childControl}
      labelClassName="col-auto"
      inputClassName="col"
      label="Child:" />
  )
}

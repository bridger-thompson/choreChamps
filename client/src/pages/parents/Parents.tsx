import { TabbedMenu } from "../../components/ui/TabbedMenu"
import { ManageChildren } from "./children/ManageChildren"
import { ManageChores } from "./chores/ManageChores"
import { ManagePrizes } from "./prizes/ManagePrizes"

export const Parents = () => {
  const tabs = [
    {
      key: "chores",
      name: "Chores",
      component: <ManageChores />
    },
    {
      key: "prizes",
      name: "Prizes",
      component: <ManagePrizes />
    },
    {
      key: "children",
      name: "Children",
      component: <ManageChildren />
    }
  ]
  return (
    <div className="container">
      <h1 className="text-center">Parent</h1>
      <TabbedMenu tabs={tabs} />
    </div>
  )
}

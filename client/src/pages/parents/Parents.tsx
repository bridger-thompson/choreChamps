import { useState } from 'react';
import { PinInput } from './PinInput'; // Adjust the import path as needed
import { TabbedMenu } from "../../components/ui/TabbedMenu";
import { ManageChildren } from "./children/ManageChildren";
import { ManageChores } from "./chores/ManageChores";
import { ManagePrizes } from "./prizes/ManagePrizes";
import { useAuthorizeUserMutation } from '../../hooks/peopleHooks';
import toast from 'react-hot-toast';

export const Parents = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const authorizeUserMutation = useAuthorizeUserMutation()

  const authorizeUser = async (pin: string) => {
    authorizeUserMutation.mutateAsync(pin).then((authorized) => {
      if (authorized)
        setIsAuthorized(true);
      else
        toast.error("Invalid PIN")
    })
  };

  const tabs = [
    {
      key: "children",
      name: "Children",
      component: <ManageChildren />
    },
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
  ]

  if (!isAuthorized) {
    return <PinInput onAuthorize={authorizeUser} />;
  }

  return (
    <div className="container">
      <h1 className="text-center">Parent</h1>
      <TabbedMenu tabs={tabs} />
    </div>
  );
};

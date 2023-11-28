import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeAdvertiser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import InsertionOrdersList from "./InsertionOrdersList";

function AdvertisersListItem({ advertiser }) {
  const [doRemoveAdvertiser, isLoading, error] = useThunk(removeAdvertiser);

  const handleClick = () => {
    doRemoveAdvertiser(advertiser);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting advertiser.</div>}
      {advertiser.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <InsertionOrdersList advertiser={advertiser} />
    </ExpandablePanel>
  );
}

export default AdvertisersListItem;

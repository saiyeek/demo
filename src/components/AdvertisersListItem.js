import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { useRemoveAdvertiserMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import InsertionOrdersList from "./InsertionOrdersList";

function AdvertisersListItem({ advertiser }) {
  const [removeAdvertiser, results] = useRemoveAdvertiserMutation();

  const handleClick = () => {
    console.log({ advertiser });
    removeAdvertiser(advertiser);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        loading={results.isLoading}
        onClick={handleClick}
      >
        <GoTrashcan />
      </Button>
      {results.error && <div>Error deleting advertiser.</div>}
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

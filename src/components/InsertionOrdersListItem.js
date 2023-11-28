import { GoTrashcan } from "react-icons/go";
import { useRemoveInsertionOrderMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import LineItemsList from "./LineItemsList";

function InsertionOrdersListItem({ insertionOrder }) {
  const [removeInsertionOrder, results] = useRemoveInsertionOrderMutation();

  const handleRemoveInsertionOrder = () => {
    removeInsertionOrder(insertionOrder);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleRemoveInsertionOrder}
      >
        <GoTrashcan />
      </Button>
      {insertionOrder.title}
    </>
  );

  return (
    <ExpandablePanel key={insertionOrder.id} header={header}>
      <LineItemsList insertionOrder={insertionOrder} />
    </ExpandablePanel>
  );
}

export default InsertionOrdersListItem;

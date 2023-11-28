import { useFetchLineItemsQuery, useAddLineItemMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import LineItemsListItem from "./LineItemsListItem";

function LineItemsList({ insertionOrder }) {
  const { data, isFetching, error } = useFetchLineItemsQuery(insertionOrder);
  const [addLineItem, addLineItemResults] = useAddLineItemMutation();

  const handleAddLineItem = () => {
    addLineItem(insertionOrder);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching lineItems...</div>;
  } else {
    content = data.map((lineItem) => {
      return <LineItemsListItem key={lineItem.id} lineItem={lineItem} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
          LineItems In {insertionOrder.title}
        </h3>
        <Button
          loading={addLineItemResults.isLoading}
          onClick={handleAddLineItem}
        >
          + Add LineItem
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default LineItemsList;

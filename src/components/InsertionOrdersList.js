import {
  useFetchInsertionOrdersQuery,
  useAddInsertionOrderMutation,
} from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import InsertionOrdersListItem from "./InsertionOrdersListItem";

function InsertionOrdersList({ advertiser }) {
  const { data, error, isFetching } = useFetchInsertionOrdersQuery(advertiser);
  const [addInsertionOrder, results] = useAddInsertionOrderMutation();

  const handleAddInsertionOrder = () => {
    addInsertionOrder(advertiser);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error loading insertionOrders.</div>;
  } else {
    content = data.map((insertionOrder) => {
      return (
        <InsertionOrdersListItem
          key={insertionOrder.id}
          insertionOrder={insertionOrder}
        />
      );
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
          InsertionOrders for {advertiser.name}
        </h3>
        <Button loading={results.isLoading} onClick={handleAddInsertionOrder}>
          + Add InsertionOrder
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default InsertionOrdersList;

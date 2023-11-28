import { GoTrashcan } from 'react-icons/go';
import { useRemoveLineItemMutation } from "../store";

function LineItemsListItem({ lineItem }) {
  const [removeLineItem] = useRemoveLineItemMutation();

  const handleRemoveLineItem = () => {
    removeLineItem(lineItem);
  };

  return (
    <div onClick={handleRemoveLineItem} className="relative cursor-pointer m-2">
      <img className="h-20 w-20" src={lineItem.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
}

export default LineItemsListItem;

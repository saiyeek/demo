import { useFetchAdvertisersQuery, useAddAdvertiserMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import AdvertisersListItem from "./AdvertisersListItem";

function AdvertisersList() {
  const [addAdvertiser, results] = useAddAdvertiserMutation();

  const {
    data,
    isLoading: isLoadingAdvertisers,
    error: loadingAdvertisersError,
  } = useFetchAdvertisersQuery();

  const handleUserAdd = () => {
    addAdvertiser();
  };

  let content;
  if (isLoadingAdvertisers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingAdvertisersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((advertiser) => {
      return (
        <AdvertisersListItem key={advertiser.id} advertiser={advertiser} />
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Advertisers</h1>
        <Button loading={results.isLoading} onClick={handleUserAdd}>
          + Add Advertiser
        </Button>
        {results.error && "Error creating advertiser..."}
      </div>
      {content}
    </div>
  );
}

export default AdvertisersList;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAdvertisers, addAdvertiser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useThunk } from "../hooks/use-thunk";
import AdvertisersListItem from "./AdvertisersListItem";

function AdvertisersList() {
  const [doFetchAdvertisers, isLoadingAdvertisers, loadingAdvertisersError] =
    useThunk(fetchAdvertisers);
  const [doCreateUser, isCreatingUser, creatingUserError] =
    useThunk(addAdvertiser);
  const { data } = useSelector((state) => {
    return state.advertisers;
  });

  useEffect(() => {
    doFetchAdvertisers();
  }, [doFetchAdvertisers]);

  const handleUserAdd = () => {
    doCreateUser();
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
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add Advertiser
        </Button>
        {creatingUserError && "Error creating advertiser..."}
      </div>
      {content}
    </div>
  );
}

export default AdvertisersList;

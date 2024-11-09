import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import NewRoomView from "@/views/AdminRoomsView/NewRoomView";

function NewRoomPage() {
  return (
    <>
      <Meta
        title="New Room - Hotel Valhalla"
        description="New Room - Hotel Valhalla"
      />
      <NewRoomView />
    </>
  );
}

export default NewRoomPage;

export const getServerSideProps = protectAuthorizedPage;

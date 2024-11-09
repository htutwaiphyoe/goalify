import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import EditRoomView from "@/views/AdminRoomsView/EditRoomView";

function EditRoomPage() {
  return (
    <>
      <Meta
        title="Edit Room - Hotel Valhalla"
        description="Edit Room - Hotel Valhalla"
      />
      <EditRoomView />
    </>
  );
}

export default EditRoomPage;

export const getServerSideProps = protectAuthorizedPage;

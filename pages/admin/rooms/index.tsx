import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import AdminRoomsView from "@/views/AdminRoomsView";

function AdminRoomsPage() {
  return (
    <>
      <Meta
        title="All Rooms - Hotel Valhalla"
        description="All Rooms - Hotel Valhalla"
      />
      <AdminRoomsView />
    </>
  );
}

export default AdminRoomsPage;

export const getServerSideProps = protectAuthorizedPage;

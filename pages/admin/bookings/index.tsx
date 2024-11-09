import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import AdminBookingsView from "@/views/AdminBookingsView";

function AdminBookingsPage() {
  return (
    <>
      <Meta
        title="All Bookings - Hotel Valhalla"
        description="All Bookings - Hotel Valhalla"
      />
      <AdminBookingsView />
    </>
  );
}

export default AdminBookingsPage;

export const getServerSideProps = protectAuthorizedPage;

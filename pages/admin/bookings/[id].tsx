import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import BookingDetailsView from "@/views/BookingDetailsView";

function AdminBookingDetailsPage() {
  return (
    <>
      <Meta
        title={`My Booking Details - Hotel Valhalla`}
        description="My booking details in Hotel Valhalla"
      />
      <BookingDetailsView />
    </>
  );
}

export default AdminBookingDetailsPage;

export const getServerSideProps = protectAuthorizedPage;

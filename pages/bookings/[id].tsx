import { protectAuthenticatedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import BookingDetailsView from "@/views/BookingDetailsView";

function BookingDetailsPage() {
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

export default BookingDetailsPage;

export const getServerSideProps = protectAuthenticatedPage;

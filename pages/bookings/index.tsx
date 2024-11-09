import { protectAuthenticatedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import MyBookingsView from "@/views/MyBookingsView";

function BookingsPage() {
  return (
    <>
      <Meta
        title={`My Bookings - Hotel Valhalla`}
        description="My bookings in Hotel Valhalla"
      />
      <MyBookingsView />
    </>
  );
}

export default BookingsPage;

export const getServerSideProps = protectAuthenticatedPage;

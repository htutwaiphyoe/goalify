import RoomListView from "@/views/RoomListView";
import Meta from "@/components/Meta";
import { wrapper } from "@/redux/store";
import { getAllRooms } from "@/redux/actions/roomActions";

function RoomsPage() {
  return (
    <>
      <Meta
        title="Rooms - Hotel Valhalla"
        description="Find the suitable room and spend for your holidays with us."
      />
      <RoomListView />
    </>
  );
}

export default RoomsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllRooms());
    return { props: {} };
  }
);

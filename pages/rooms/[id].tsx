import RoomDetailsView from "@/views/RoomDetailsView";
import { wrapper } from "@/redux/store";
import { getRoomDetails } from "@/redux/actions/roomActions";

function RoomDetailsPage() {
  return <RoomDetailsView />;
}

export default RoomDetailsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(getRoomDetails(query.id as string));
      return { props: {} };
    }
);

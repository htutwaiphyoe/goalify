import useRedirect from "@/hooks/useRedirect";
import RoomForm from "./RoomForm";
import { useDispatch, useSelector } from "react-redux";
import { createRoomByAdmin, resetAPIState } from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import { bedType, roomCategory } from "@/data/constant";

function NewRoomView() {
  const dispatch = useDispatch<any>();
  const { pushToAdminRooms } = useRedirect();

  const { message, error } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetAPIState,
    onSuccess: pushToAdminRooms,
  });

  return (
    <section className="pt-3 sm:pt-14 flex justify-center items-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <RoomForm
          data={{
            roomNumber: "",
            name: "",
            description: "",
            category: roomCategory.superior,
            facilities: [],
            pricePerNight: 1,
            promotion: "",
            guestCapacity: 1,
            bedType: bedType.single,
            image: "",
          }}
          edit={false}
          onSubmit={async (values) => await dispatch(createRoomByAdmin(values))}
          onBack={pushToAdminRooms}
        />
      </div>
    </section>
  );
}

export default NewRoomView;

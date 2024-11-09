import useRedirect from "@/hooks/useRedirect";
import RoomForm from "./RoomForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomByAdmin,
  updateRoomByAdmin,
  resetRoomByAdmin,
  resetAPIState,
} from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "@/components/Loader";

function EditRoomView() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { pushToAdminRooms } = useRedirect();

  useEffect(() => {
    if (router.query.id) {
      dispatch(getRoomByAdmin(router.query.id as string));
    }
  }, [dispatch, router.query.id]);

  const { message, error } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetAPIState,
    onSuccess: pushToAdminRooms,
  });

  const {
    room,
    error: roomDetailsError,
    loading: roomDetailsLoading,
  } = useSelector<RootState, RoomDetailsState>((state) => state.roomDetails);

  useToastEffect({ error: roomDetailsError, reset: resetRoomByAdmin });

  return (
    <section className="pt-3 sm:pt-14 flex justify-center items-center">
      {roomDetailsLoading || !room ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
          <RoomForm
            edit
            onBack={pushToAdminRooms}
            onSubmit={async (values) => {
              const body = {
                ...values,
                image: values.image === room.image.url ? null : values.image,
              };
              await dispatch(
                updateRoomByAdmin(router.query.id as string, body)
              );
            }}
            data={{
              roomNumber: room.roomNumber,
              name: room.name,
              description: room.description,
              category: room.category,
              facilities: room.facilities.map((facility) => facility._id),
              pricePerNight: room.pricePerNight,
              promotion: room.promotion ? room.promotion._id : "",
              guestCapacity: room.guestCapacity,
              bedType: room.bedType,
              image: room.image.url,
            }}
          />
        </div>
      )}
    </section>
  );
}

export default EditRoomView;

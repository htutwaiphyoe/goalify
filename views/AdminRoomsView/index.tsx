import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import {
  getAllRoomsByAdmin,
  deleteRoomByAdmin,
  resetAPIState,
  resetAllRoomsByAdmin,
} from "@/redux/actions/adminActions";
import { useEffect, useState } from "react";
import Button from "@/components/Form/Button";
import AddIcon from "@mui/icons-material/Add";
import Loader from "@/components/Loader";
import EmptyRoom from "../RoomListView/EmptyRoom";
import AdminRoomCard from "./AdminRoomCard";
import useRedirect from "@/hooks/useRedirect";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import { SelectChangeEvent } from "@mui/material";
import Select from "@/components/Form/Select";
import { bedTypes, roomCategories } from "@/data/constant";

function AdminRoomsView() {
  const dispatch = useDispatch<any>();
  const { pushToNewRoom, pushToEditRoom } = useRedirect();
  const [deletedId, setDeletedId] = useState("");
  const [filters, setFilters] = useState({ roomCategory: "", bedType: "" });

  useEffect(() => {
    dispatch(getAllRoomsByAdmin());
  }, [dispatch]);

  const { rooms, error, loading } = useSelector<RootState, AllRoomsState>(
    (state) => state.allRooms
  );

  useToastEffect({ error, reset: resetAllRoomsByAdmin });

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setFilters((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const filteredRooms = rooms?.filter((room) => {
    let condition = true;
    if (filters.roomCategory)
      condition = condition && room.category === filters.roomCategory;
    if (filters.bedType)
      condition = condition && room.bedType === filters.bedType;
    return condition;
  });

  const {
    message: deleteMessage,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector<RootState, APIState>((state) => state.password);

  useToastEffect({
    error: deleteError,
    message: deleteMessage,
    reset: resetAPIState,
    onSuccess: () => {
      setDeletedId("");
      dispatch(getAllRoomsByAdmin());
    },
  });

  return (
    <section className="pt-3 sm:pt-14">
      <DeleteDialog
        open={!!deletedId}
        loading={deleteLoading}
        onClose={() => setDeletedId("")}
        onDelete={() => dispatch(deleteRoomByAdmin(deletedId))}
        label="Delete Room"
        description="Are you sure you want to delete this room?"
      />
      {loading ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center lg:space-x-2 lg:space-y-0 space-y-3 mb-7">
            <h1 className="text-3xl font-bold">
              {rooms.length} AVAILABLE ROOM{rooms.length > 1 ? "S" : ""}
            </h1>
            <div className="flex sm:flex-row flex-col sm:item-center sm:space-x-3 sm:space-y-0 space-y-3">
              <div>
                <Select
                  className="w-[150px]"
                  list={roomCategories}
                  placeholder="Room Category"
                  value={filters.roomCategory}
                  name="roomCategory"
                  displayEmpty
                  onChange={handleChange}
                />
              </div>
              <div>
                <Select
                  className="w-[150px]"
                  list={bedTypes}
                  placeholder="Bed Type"
                  value={filters.bedType}
                  name="bedType"
                  onChange={handleChange}
                  displayEmpty
                />
              </div>
              <div>
                <Button
                  label="New room"
                  variant="contained"
                  color="primary"
                  size="xl"
                  startIcon={<AddIcon />}
                  onClick={pushToNewRoom}
                />
              </div>
            </div>
          </div>
          {filteredRooms.length <= 0 ? (
            <EmptyRoom title="No rooms available." />
          ) : (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {filteredRooms.map((room) => (
                  <AdminRoomCard
                    room={room}
                    key={room._id}
                    onEdit={() => pushToEditRoom(room._id)}
                    onDelete={() => setDeletedId(room._id)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default AdminRoomsView;

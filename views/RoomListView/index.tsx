import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import Select from "@/components/Form/Select";
import { bedTypes, roomCategories } from "@/data/constant";
import RoomCard from "./RoomCard";
import useToastEffect from "@/hooks/useToastEffect";
import { resetAllRooms } from "@/redux/actions/roomActions";
import EmptyRoom from "./EmptyRoom";
import { appendS } from "@/utils/helpers";

function RoomListView() {
  const { rooms, error } = useSelector<RootState, AllRoomsState>(
    (state) => state.allRooms
  );
  const [filters, setFilters] = useState({ roomCategory: "", bedType: "" });

  useToastEffect({ error, reset: resetAllRooms });

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

  return (
    <section className="pt-3 sm:pt-10">
      <div className="flex justify-between lg:flex-row flex-col items-start lg:items-end space-y-2 lg:space-x-2 mb-7">
        <div>
          <h1 className="text-4xl font-bold mb-4">OUR AVAILABLE ROOMS</h1>
          <p className="text-base text-gray-800  max-w-700">
            Our hotel offers {rooms?.length} room{appendS(rooms.length)} with
            nice and cool air condition system, 24 hours electricity service,
            speedy Wi-Fi internet and secure fire prevention and firefighting
            system.
          </p>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-[150px_150px] gap-4">
          <Select
            list={roomCategories}
            placeholder="Room Category"
            value={filters.roomCategory}
            name="roomCategory"
            displayEmpty
            onChange={handleChange}
          />
          <Select
            list={bedTypes}
            placeholder="Bed Type"
            value={filters.bedType}
            name="bedType"
            onChange={handleChange}
            displayEmpty
          />
        </div>
      </div>
      {filteredRooms.length > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5">
          {filteredRooms.map((room) => (
            <RoomCard room={room} key={room._id} />
          ))}
        </div>
      ) : (
        <EmptyRoom />
      )}
    </section>
  );
}

export default RoomListView;

import { useSelector } from "react-redux";
import Meta from "@/components/Meta";
import useToastEffect from "@/hooks/useToastEffect";
import { resetRoomDetails } from "@/redux/actions/roomActions";
import EmptyRoom from "../RoomListView/EmptyRoom";
import Image from "next/image";
import RoomFeatures from "./RoomFeatures";
import RoomFacilities from "./RoomFacilities";
import RoomDetailsInfo from "./RoomDetailsInfo";
import RoomReviews from "./RoomReviews";
import RoomBooking from "./RoomBooking";

export default function RoomDetailsView() {
  const { room, error } = useSelector<RootState, RoomDetailsState>(
    (state) => state.roomDetails
  );

  useToastEffect({ error, reset: resetRoomDetails });

  if (!room)
    return (
      <section className="pt-3 sm:pt-10">
        <EmptyRoom title="No room available." />
      </section>
    );

  return (
    <section className="pt-3 sm:pt-10">
      <Meta
        title={room.name as string}
        description={room.description as string}
      />
      <Image
        src={room.image.url}
        alt={room.name}
        width={1000}
        height={500}
        className="w-full h-300 sm:h-600 rounded-2xl object-cover mb-8"
      />
      <div className="flex lg:flex-row lg:space-x-5 lg:space-y-0 flex-col space-y-5 justify-between items-start">
        <div className="grid gap-8 w-full xl:max-w-800">
          <RoomDetailsInfo
            name={room.name}
            roomNumber={room.roomNumber}
            ratings={room.ratings}
            numOfReviews={room.numOfReviews}
            description={room.description}
          />
          <RoomFeatures
            guestCapacity={room.guestCapacity}
            category={room.category}
            bedType={room.bedType}
          />
          {room.facilities.length > 0 && (
            <RoomFacilities facilities={room.facilities} />
          )}
          <RoomReviews reviews={room.reviews} />
        </div>
        <RoomBooking
          pricePerNight={room.pricePerNight}
          promotion={room.promotion}
        />
      </div>
    </section>
  );
}

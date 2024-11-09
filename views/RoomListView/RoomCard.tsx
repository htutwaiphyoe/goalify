import Button from "@/components/Form/Button";
import { MMKRate } from "@/data/constant";
import useRedirect from "@/hooks/useRedirect";
import Image from "next/image";
import Ratings from "@/components/Ratings";
import { getPromotionValue } from "@/utils/helpers";

type RoomCardProps = {
  room: Room;
};

function RoomCard({ room }: RoomCardProps) {
  const { pushToRoomDetails } = useRedirect();

  return (
    <div className="border rounded-2xl overflow-hidden shadow-sm self-start">
      <Image
        src={room.image.url}
        alt={room.name}
        width={400}
        height={200}
        className="w-full object-cover h-[180px]"
      />
      <div className="p-4 grid gap-2">
        <h3 className="font-bold text-xl">
          {room.name} ({room.roomNumber})
        </h3>
        <p className="text-base line-clamp-2">{room.description}</p>
        <p className="text-base font-bold text-gray-800">
          {room.promotion && (
            <span>
              $
              {getPromotionValue({
                value: room.pricePerNight,
                percent: room.promotion.percentRate,
              })}{" "}
              (
              {(
                getPromotionValue({
                  value: room.pricePerNight,
                  percent: room.promotion.percentRate,
                }) * MMKRate
              ).toLocaleString()}{" "}
              MMK)
            </span>
          )}
          <span className={room.promotion ? "line-through ml-2" : ""}>
            ${room.pricePerNight} (
            {(room.pricePerNight * MMKRate).toLocaleString()} MMK)
          </span>
          <span> / per night</span>
        </p>
        {room.promotion && (
          <p className="text-base text-gray-500 mb-2 font-bold italic">
            {room.promotion.name} - {room.promotion.percentRate}% off
          </p>
        )}
        <Ratings ratings={room.ratings} numOfReviews={room.numOfReviews} />
        <div className="flex justify-end mt-2">
          <Button
            label="View details"
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => pushToRoomDetails(room._id)}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomCard;

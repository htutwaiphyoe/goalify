import Ratings from "@/components/Ratings";

type RoomDetailsInfoProps = {
  name: string;
  roomNumber: string;
  ratings: number;
  numOfReviews: number;
  description: string;
};

export default function RoomDetailsInfo({
  name,
  roomNumber,
  ratings,
  numOfReviews,
  description,
}: RoomDetailsInfoProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3 capitalize italic">
        {name} ({roomNumber})
      </h1>
      <Ratings ratings={ratings} numOfReviews={numOfReviews} />
      <h2 className="font-bold text-xl mb-2 mt-5">Description</h2>
      <p className="text-lg text-gray-700 break-all">{description}</p>
    </div>
  );
}

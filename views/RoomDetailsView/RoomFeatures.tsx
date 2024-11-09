import GroupIcon from "@mui/icons-material/Group";
import BedIcon from "@mui/icons-material/Bed";
import NightShelterIcon from "@mui/icons-material/NightShelter";

type RoomFeaturesProps = {
  guestCapacity: number;
  category: string;
  bedType: string;
};

export default function RoomFeatures({
  guestCapacity,
  category,
  bedType,
}: RoomFeaturesProps) {
  return (
    <div>
      <h2 className="font-bold text-xl mb-2">Features</h2>
      <div className="flex sm:items-center sm:space-x-6 sm:space-y-0 space-y-3 sm:flex-row flex-col">
        <div className="flex items-center space-x-2">
          <GroupIcon />
          <p>{guestCapacity} Guests</p>
        </div>
        <div className="flex items-center space-x-2">
          <NightShelterIcon />
          <p>{category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <BedIcon />
          <p>{bedType}</p>
        </div>
      </div>
    </div>
  );
}

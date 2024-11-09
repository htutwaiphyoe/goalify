import Button from "@/components/Form/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Status from "@/components/Status";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import GrassIcon from "@mui/icons-material/Grass";
import ComputerIcon from "@mui/icons-material/Computer";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import moment from "moment";
import { roles } from "@/data/constant";

type AdminUserCardProps = {
  user: User;
  onEdit: () => void;
  onStatusChange: () => void;
};

function AdminUserCard({ user, onEdit, onStatusChange }: AdminUserCardProps) {
  return (
    <div className="border rounded-2xl shadow-sm overflow-hidden self-start">
      <div className="p-4 grid gap-3">
        <div className="flex items-center space-x-2">
          <Avatar
            alt={user.name}
            src={user.avatar.url}
            className="w-12 h-12 object-cover"
          />
          <h3 className="text-base font-bold">{user.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Status status={user.role} color="info" />
          <Status
            status={user.isSuspended ? "Suspended" : "Active"}
            color={user.isSuspended ? "danger" : "success"}
          />
        </div>
        <div className="flex items-center space-x-2">
          <EmailIcon />
          <p className="text-base break-all">{user.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneIcon />
          <p className="text-base">{user.phone ? `+${user.phone}` : "--"}</p>
        </div>
        {user.preferences.isFitnessEnthusiast && (
          <div className="flex items-center space-x-2">
            <FitnessCenterIcon />
            <p className="text-base">Fitness enthusiast</p>
          </div>
        )}
        {user.preferences.isFoodie && (
          <div className="flex items-center space-x-2">
            <RestaurantIcon />
            <p className="text-base">Foodie</p>
          </div>
        )}
        {user.preferences.isMinimalist && (
          <div className="flex items-center space-x-2">
            <PersonIcon />
            <p className="text-base">Minimalist</p>
          </div>
        )}
        {user.preferences.isSmoker && (
          <div className="flex items-center space-x-2">
            <SmokingRoomsIcon />
            <p className="text-base">Smoker</p>
          </div>
        )}
        {user.preferences.isVegan && (
          <div className="flex items-center space-x-2">
            <GrassIcon />
            <p className="text-base">Vegan</p>
          </div>
        )}
        {user.preferences.isWorkaholic && (
          <div className="flex items-center space-x-2">
            <ComputerIcon />
            <p className="text-base">Workaholic</p>
          </div>
        )}
        {user.preferences.usedWheelChair && (
          <div className="flex items-center space-x-2">
            <WheelchairPickupIcon />
            <p className="text-base">Wheel chair</p>
          </div>
        )}
        <p className="text-base">
          Created at: {moment(user.createdAt).format("DD MMM YYYY, hh:mm A")}
        </p>
        <p className="text-base">
          Updated at: {moment(user.updatedAt).format("DD MMM YYYY, hh:mm A")}
        </p>
        <div className="flex justify-end mt-2 space-x-2">
          <Button
            startIcon={<EditIcon />}
            label="Edit"
            color="primary"
            variant="outlined"
            size="small"
            onClick={onEdit}
          />
          {user.role !== roles.admin && (
            <Button
              startIcon={user.isSuspended ? <AutorenewIcon /> : <DeleteIcon />}
              label={user.isSuspended ? "Activate" : "Suspend"}
              color="error"
              variant="contained"
              size="small"
              onClick={onStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUserCard;

import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@/components/Form/Button";

type Props = {
  facility: Facility;
  onEdit: () => void;
  onDelete: () => void;
};

function AdminFacilityCard({ facility, onEdit, onDelete }: Props) {
  return (
    <div className="border p-5 rounded-lg shadow-sm grid gap-2">
      <h3 className="font-bold text-base">{facility.name}</h3>
      <p className="text-sm">{facility.description}</p>
      <p className="text-sm text-gray-700">
        Created At: {moment(facility.createdAt).format("DD MMM YYYY, hh:mm A")}
      </p>
      <p className="text-sm text-gray-700">
        Updated At: {moment(facility.updatedAt).format("DD MMM YYYY, hh:mm A")}
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
        <Button
          startIcon={<DeleteIcon />}
          label="Delete"
          color="error"
          variant="contained"
          size="small"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}

export default AdminFacilityCard;

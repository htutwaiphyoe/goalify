import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@/components/Form/Button";

type Props = {
  promotion: Promotion;
  onEdit: () => void;
  onDelete: () => void;
};

function AdminPromotionCard({ promotion, onEdit, onDelete }: Props) {
  return (
    <div className="border p-5 rounded-lg shadow-sm grid gap-2">
      <h3 className="font-bold text-4xl">{promotion.percentRate}%</h3>
      <h3 className="font-bold text-base">{promotion.name}</h3>
      <p className="text-sm text-gray-700">
        Created At: {moment(promotion.createdAt).format("DD MMM YYYY, hh:mm A")}
      </p>
      <p className="text-sm text-gray-700">
        Updated At: {moment(promotion.updatedAt).format("DD MMM YYYY, hh:mm A")}
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

export default AdminPromotionCard;

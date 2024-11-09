import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@/components/Form/Button";
import { Avatar, Rating } from "@mui/material";

type AdminReviewCardProps = {
  review: Review;
  onDelete: () => void;
};

function AdminReviewCard({ review, onDelete }: AdminReviewCardProps) {
  return (
    <div className="border p-5 rounded-lg shadow-sm grid gap-2 self-start">
      <div className="flex items-center space-x-2">
        <Avatar
          alt={review.name}
          src={review.avatar.url}
          className="w-12 h-12 object-cover"
        />
        <h3 className="text-base font-bold">{review.name}</h3>
      </div>
      <div className="flex items-center space-x-2 ">
        <Rating value={review.rating} precision={0.5} readOnly size="small" />
        <p className="text-lg font-bold">({review.rating})</p>
      </div>
      <p className="text-base text-gray-900 italic break-all">{`"${review.comment}"`}</p>
      <hr className="my-1" />
      <p className="text-sm">
        Created at: {moment(review.createdAt).format("DD MMM YYYY, hh:mm A")}
      </p>
      <p className="text-sm">
        Updated at: {moment(review.updatedAt).format("DD MMM YYYY, hh:mm A")}
      </p>
      <div className="flex justify-end mt-2 space-x-2">
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

export default AdminReviewCard;

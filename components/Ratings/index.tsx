import { Rating } from "@mui/material";

type RatingsProps = {
  ratings: number;
  numOfReviews: number;
};

function Ratings({ ratings, numOfReviews }: RatingsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Rating
        name="read-only"
        value={ratings}
        readOnly
        size="medium"
        precision={0.5}
      />
      <span className="text-lg font-bold">
        ({numOfReviews} review
        {numOfReviews > 1 ? "s" : ""})
      </span>
    </div>
  );
}

export default Ratings;

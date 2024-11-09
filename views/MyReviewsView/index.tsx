import Loader from "@/components/Loader";
import EmptyRoom from "../RoomListView/EmptyRoom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAPIState } from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import AdminReviewCard from "../AdminReviewsView/AdminReviewCard";
import {
  getUserReviews,
  clearUserReviews,
  resetUserReviews,
  deleteUserReview,
} from "@/redux/actions/reviewActions";

function MyReviewsView() {
  const dispatch = useDispatch<any>();
  const [deletedIds, setDeletedIds] = useState({ reviewId: "", roomId: "" });

  useEffect(() => {
    dispatch(getUserReviews());
  }, [dispatch]);

  const { reviews, error, loading } = useSelector<RootState, AdminReviewsState>(
    (state) => state.adminReviews
  );

  useToastEffect({ error, reset: resetUserReviews, clear: clearUserReviews });

  const {
    message: deleteMessage,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector<RootState, APIState>((state) => state.password);

  useToastEffect({
    message: deleteMessage,
    error: deleteError,
    reset: resetAPIState,
    onSuccess: () => {
      setDeletedIds({ reviewId: "", roomId: "" });
      dispatch(getUserReviews());
    },
  });

  return (
    <section className="pt-5 sm:pt-14">
      <h1 className="text-4xl font-bold text-center  uppercase tracking-wider">
        My Reviews
      </h1>
      <hr className="w-100 mx-auto my-7" />
      <DeleteDialog
        open={!!deletedIds.reviewId}
        loading={deleteLoading}
        onClose={() => setDeletedIds({ reviewId: "", roomId: "" })}
        onDelete={() =>
          dispatch(deleteUserReview(deletedIds.reviewId, deletedIds.roomId))
        }
        label="Delete Review"
        description="Are you sure you want to delete this review?"
      />
      {loading ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <>
          {reviews.length <= 0 ? (
            <EmptyRoom title="No reviews available." />
          ) : (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {reviews.map((review) => (
                  <AdminReviewCard
                    review={review}
                    key={review._id}
                    onDelete={() =>
                      setDeletedIds({
                        reviewId: review._id,
                        roomId: review.room,
                      })
                    }
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MyReviewsView;

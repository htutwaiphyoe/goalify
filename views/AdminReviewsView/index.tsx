import Loader from "@/components/Loader";
import EmptyRoom from "../RoomListView/EmptyRoom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviewsByAdmin,
  deleteReviewByAdmin,
  resetAPIState,
  resetAllReviewsByAdmin,
  clearAllReviewsByAdmin,
} from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import AdminReviewCard from "./AdminReviewCard";
import Select from "@/components/Form/Select";
import { SelectChangeEvent } from "@mui/material";
import { orderList, orders } from "@/data/constant";
import moment from "moment";

function AdminReviewsView() {
  const dispatch = useDispatch<any>();
  const [deletedIds, setDeletedIds] = useState({ reviewId: "", roomId: "" });
  const [filters, setFilters] = useState({ room: "", order: orders.newest });

  useEffect(() => {
    dispatch(getAllReviewsByAdmin());
  }, [dispatch]);

  const { reviews, roomList, error, loading } = useSelector<
    RootState,
    AdminReviewsState
  >((state) => state.adminReviews);

  useToastEffect({
    error,
    reset: resetAllReviewsByAdmin,
    clear: clearAllReviewsByAdmin,
  });

  const {
    message: deleteMessage,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector<RootState, APIState>((state) => state.password);

  useToastEffect({
    error: deleteError,
    message: deleteMessage,
    reset: resetAPIState,
    onSuccess: () => {
      setDeletedIds({ reviewId: "", roomId: "" });
      dispatch(getAllReviewsByAdmin());
    },
  });

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setFilters((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const filteredReviews = reviews
    ?.filter((review) => {
      let condition = true;
      if (filters.room) condition = condition && review.room === filters.room;
      return condition;
    })
    .sort((a, b) =>
      filters.order === orders.newest
        ? moment(b.updatedAt).valueOf() - moment(a.updatedAt).valueOf()
        : moment(a.updatedAt).valueOf() - moment(b.updatedAt).valueOf()
    );

  return (
    <section className="pt-3 sm:pt-14">
      <DeleteDialog
        open={!!deletedIds.reviewId}
        loading={deleteLoading}
        onClose={() => setDeletedIds({ reviewId: "", roomId: "" })}
        onDelete={() =>
          dispatch(deleteReviewByAdmin(deletedIds.reviewId, deletedIds.roomId))
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
          <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center lg:space-x-2 space-y-3 lg:space-y-0 mb-7">
            <h1 className="text-3xl font-bold">
              {reviews.length} AVAILABLE REVIEW{reviews.length > 1 ? "S" : ""}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
              <div>
                <Select
                  list={orderList}
                  value={filters.order}
                  onChange={handleChange}
                  displayEmpty
                  name="order"
                  className="w-200"
                />
              </div>
              <div>
                <Select
                  list={[{ label: "All rooms", value: "" }, ...roomList]}
                  value={filters.room}
                  onChange={handleChange}
                  displayEmpty
                  className="w-250"
                  name="room"
                />
              </div>
            </div>
          </div>
          {filteredReviews.length <= 0 ? (
            <EmptyRoom title="No reviews available." />
          ) : (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {filteredReviews.map((review) => (
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

export default AdminReviewsView;

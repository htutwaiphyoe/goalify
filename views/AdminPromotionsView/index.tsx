import Loader from "@/components/Loader";
import EmptyRoom from "../RoomListView/EmptyRoom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPromotionsByAdmin,
  deletePromotionByAdmin,
  resetAllPromotionsByAdmin,
  clearAllPromotionsByAdmin,
  resetAPIState,
} from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import Button from "@/components/Form/Button";
import AddIcon from "@mui/icons-material/Add";
import useRedirect from "@/hooks/useRedirect";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import AdminPromotionCard from "./AdminPromotionCard";

function AdminPromotionsView() {
  const dispatch = useDispatch<any>();
  const [deletedId, setDeletedId] = useState("");
  const { pushToNewPromotion, pushToEditPromotion } = useRedirect();

  useEffect(() => {
    dispatch(getAllPromotionsByAdmin());
  }, [dispatch]);

  const { promotions, error, loading } = useSelector<
    RootState,
    AdminPromotionsState
  >((state) => state.adminPromotions);

  useToastEffect({
    error,
    reset: resetAllPromotionsByAdmin,
    clear: clearAllPromotionsByAdmin,
  });

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
      setDeletedId("");
      dispatch(getAllPromotionsByAdmin());
    },
  });

  return (
    <section className="pt-3 sm:pt-14">
      <DeleteDialog
        open={!!deletedId}
        loading={deleteLoading}
        onClose={() => setDeletedId("")}
        onDelete={() => dispatch(deletePromotionByAdmin(deletedId))}
        label="Delete Promotion"
        description="Are you sure you want to delete this promotion?"
      />
      {loading ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex md:flex-row flex-col md:justify-between md:items-center md:space-x-2 md:space-y-0 space-y-3 mb-7">
            <h1 className="text-3xl font-bold">
              {promotions.length} AVAILABLE{" "}
              {promotions.length > 1 ? "PROMOTIONS" : "PROMOTION"}
            </h1>
            <Button
              label="New promotion"
              variant="contained"
              color="primary"
              size="xl"
              startIcon={<AddIcon />}
              onClick={pushToNewPromotion}
            />
          </div>
          {promotions.length <= 0 ? (
            <EmptyRoom title="No promotions available." />
          ) : (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {promotions.map((promotion) => (
                  <AdminPromotionCard
                    promotion={promotion}
                    key={promotion._id}
                    onEdit={() => pushToEditPromotion(promotion._id)}
                    onDelete={() => setDeletedId(promotion._id)}
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

export default AdminPromotionsView;

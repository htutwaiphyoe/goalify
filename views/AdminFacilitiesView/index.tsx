import Loader from "@/components/Loader";
import EmptyRoom from "../RoomListView/EmptyRoom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllFacilitiesByAdmin,
  deleteFacilityByAdmin,
  getAllFacilitiesByAdmin,
  resetAPIState,
  resetAllFacilitiesByAdmin,
} from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import Button from "@/components/Form/Button";
import AddIcon from "@mui/icons-material/Add";
import AdminFacilityCard from "./AdminFacilityCard";
import useRedirect from "@/hooks/useRedirect";
import DeleteDialog from "@/components/Dialog/DeleteDialog";

function AdminFacilitiesView() {
  const dispatch = useDispatch<any>();
  const [deletedId, setDeletedId] = useState("");
  const { pushToNewFacility, pushToEditFacility } = useRedirect();

  const { facilities, error, loading } = useSelector<
    RootState,
    AdminFacilitiesState
  >((state) => state.adminFacilities);

  useToastEffect({
    error,
    reset: resetAllFacilitiesByAdmin,
    clear: clearAllFacilitiesByAdmin,
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
      setDeletedId("");
      dispatch(getAllFacilitiesByAdmin());
    },
  });

  useEffect(() => {
    dispatch(getAllFacilitiesByAdmin());
  }, [dispatch]);

  return (
    <section className="pt-3 sm:pt-14">
      <DeleteDialog
        open={!!deletedId}
        loading={deleteLoading}
        onClose={() => setDeletedId("")}
        onDelete={() => dispatch(deleteFacilityByAdmin(deletedId))}
        label="Delete Facility"
        description="Are you sure you want to delete this facility?"
      />
      {loading ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center sm:space-x-2 sm:space-y-0 space-y-3 mb-7">
            <h1 className="text-3xl font-bold">
              {facilities.length} AVAILABLE{" "}
              {facilities.length > 1 ? "FACILITIES" : "FACILITY"}
            </h1>
            <Button
              label="New facility"
              variant="contained"
              color="primary"
              size="xl"
              startIcon={<AddIcon />}
              onClick={pushToNewFacility}
            />
          </div>
          {facilities.length <= 0 ? (
            <EmptyRoom title="No facilities available." />
          ) : (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {facilities.map((facility) => (
                  <AdminFacilityCard
                    facility={facility}
                    key={facility._id}
                    onEdit={() => pushToEditFacility(facility._id)}
                    onDelete={() => setDeletedId(facility._id)}
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

export default AdminFacilitiesView;

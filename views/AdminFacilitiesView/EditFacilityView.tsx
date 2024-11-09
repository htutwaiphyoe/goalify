import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import {
  updateFacilityByAdmin,
  getFacilityByAdmin,
  resetAPIState,
  resetFacilityByAdmin,
  clearFacilityByAdmin,
} from "@/redux/actions/adminActions";
import FacilityForm from "./FacilityForm";
import useRedirect from "@/hooks/useRedirect";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

function EditFacilityView() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { pushToAdminFacilities } = useRedirect();

  useEffect(() => {
    if (router.query.id) {
      dispatch(getFacilityByAdmin(router.query.id as string));
    }
  }, [dispatch, router.query.id]);

  const { message, error } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetAPIState,
    onSuccess: pushToAdminFacilities,
  });

  const { facility, error: facilityError } = useSelector<
    RootState,
    AdminFacilityState
  >((state) => state.adminFacility);

  useToastEffect({
    error: facilityError,
    reset: resetFacilityByAdmin,
    clear: clearFacilityByAdmin,
  });

  return (
    <section className="pt-3 sm:pt-14 flex justify-center items-center">
      {!facility ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
          <FacilityForm
            edit
            onBack={pushToAdminFacilities}
            data={{ name: facility.name, description: facility.description }}
            onSubmit={async (values) =>
              await dispatch(updateFacilityByAdmin(facility._id, values))
            }
          />
        </div>
      )}
    </section>
  );
}

export default EditFacilityView;

import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import {
  createFacilityByAdmin,
  resetAPIState,
} from "@/redux/actions/adminActions";
import FacilityForm from "./FacilityForm";
import useRedirect from "@/hooks/useRedirect";

function NewFacilityView() {
  const dispatch = useDispatch<any>();
  const { pushToAdminFacilities } = useRedirect();

  const { message, error } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetAPIState,
    onSuccess: pushToAdminFacilities,
  });

  return (
    <section className="pt-3 sm:pt-14 flex justify-center items-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <FacilityForm
          edit={false}
          onBack={pushToAdminFacilities}
          data={{ name: "", description: "" }}
          onSubmit={async (values) =>
            await dispatch(createFacilityByAdmin(values))
          }
        />
      </div>
    </section>
  );
}

export default NewFacilityView;

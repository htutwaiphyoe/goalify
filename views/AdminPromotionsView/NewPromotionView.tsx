import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import {
  createPromotionByAdmin,
  resetAPIState,
} from "@/redux/actions/adminActions";
import useRedirect from "@/hooks/useRedirect";
import PromotionForm from "./PromotionForm";

function NewPromotionView() {
  const dispatch = useDispatch<any>();
  const { pushToAdminPromotions } = useRedirect();

  const { message, error } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    message,
    error,
    reset: resetAPIState,
    onSuccess: pushToAdminPromotions,
  });

  return (
    <section className="pt-3 sm:pt-14 flex justify-center items-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <PromotionForm
          edit={false}
          onBack={pushToAdminPromotions}
          data={{ name: "", percentRate: "" }}
          onSubmit={async (values) =>
            await dispatch(createPromotionByAdmin(values))
          }
        />
      </div>
    </section>
  );
}

export default NewPromotionView;

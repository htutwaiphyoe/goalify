import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import {
  getPromotionByAdmin,
  updatePromotionByAdmin,
  resetAPIState,
  resetPromotionByAdmin,
  clearPromotionByAdmin,
} from "@/redux/actions/adminActions";
import useRedirect from "@/hooks/useRedirect";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import PromotionForm from "./PromotionForm";

function EditPromotionView() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { pushToAdminPromotions } = useRedirect();

  useEffect(() => {
    if (router.query.id) {
      dispatch(getPromotionByAdmin(router.query.id as string));
    }
  }, [dispatch, router.query.id]);

  const { promotion, error: promotionError } = useSelector<
    RootState,
    AdminPromotionState
  >((state) => state.adminPromotion);

  useToastEffect({
    error: promotionError,
    reset: resetPromotionByAdmin,
    clear: clearPromotionByAdmin,
  });

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
      {!promotion ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
          <PromotionForm
            edit
            onBack={pushToAdminPromotions}
            data={{
              name: promotion.name,
              percentRate: `${promotion.percentRate}`,
            }}
            onSubmit={async (values) =>
              await dispatch(updatePromotionByAdmin(promotion._id, values))
            }
          />
        </div>
      )}
    </section>
  );
}

export default EditPromotionView;

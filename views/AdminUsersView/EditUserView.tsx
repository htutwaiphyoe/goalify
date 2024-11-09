import useRedirect from "@/hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByAdmin,
  updateUserByAdmin,
  resetAPIState,
  resetUserByAdmin,
  clearUserByAdmin,
} from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import UserForm from "./UserForm";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

function EditUserView() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { pushToAdminUsers } = useRedirect();

  useEffect(() => {
    if (router.query.id) dispatch(getUserByAdmin(router.query.id as string));
  }, [dispatch, router.query.id]);

  const { message, error } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetAPIState,
    onSuccess: pushToAdminUsers,
  });

  const {
    user,
    error: userError,
    loading: userLoading,
  } = useSelector<RootState, AdminUserState>((state) => state.adminUser);

  useToastEffect({
    error: userError,
    reset: resetUserByAdmin,
    clear: clearUserByAdmin,
  });

  return (
    <section className="pt-3 sm:pt-14 flex justify-center items-center">
      {userLoading || !user ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
          <UserForm
            edit
            onBack={pushToAdminUsers}
            onSubmit={async (values) => {
              const body = {
                ...values,
                avatar:
                  values.avatar === user.avatar.url ? null : values.avatar,
              };
              await dispatch(updateUserByAdmin(user._id, body));
            }}
            user={{
              avatar: user.avatar.url,
              name: user.name,
              email: user.email,
              phone: user.phone,
              password: "",
              role: user.role,
              preferences: user.preferences,
            }}
          />
        </div>
      )}
    </section>
  );
}

export default EditUserView;

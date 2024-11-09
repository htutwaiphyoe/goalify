import useRedirect from "@/hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { createUserByAdmin, resetAPIState } from "@/redux/actions/adminActions";
import useToastEffect from "@/hooks/useToastEffect";
import UserForm from "./UserForm";

function NewUserView() {
  const dispatch = useDispatch<any>();
  const { pushToAdminUsers } = useRedirect();

  const { message, error } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetAPIState,
    onSuccess: pushToAdminUsers,
  });

  return (
    <section className="pt-3 sm:pt-14 flex justify-center items-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <UserForm
          edit={false}
          onSubmit={async (values) => await dispatch(createUserByAdmin(values))}
          onBack={pushToAdminUsers}
          user={{
            avatar: "",
            name: "",
            email: "",
            phone: "",
            password: "",
            role: "user",
            preferences: {
              isVegan: false,
              isSmoker: false,
              usedWheelChair: false,
              isMinimalist: false,
              isFoodie: false,
              isFitnessEnthusiast: false,
              isWorkaholic: false,
            },
          }}
        />
      </div>
    </section>
  );
}

export default NewUserView;

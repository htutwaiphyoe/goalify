import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import {
  getAllUsersByAdmin,
  updateUserStatusByAdmin,
  resetAllUsersByAdmin,
  resetAPIState,
  clearAllUsersByAdmin,
} from "@/redux/actions/adminActions";
import { useEffect, useState } from "react";
import Button from "@/components/Form/Button";
import AddIcon from "@mui/icons-material/Add";
import Loader from "@/components/Loader";
import EmptyRoom from "../RoomListView/EmptyRoom";
import useRedirect from "@/hooks/useRedirect";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import AdminUserCard from "./AdminUserCard";
import Select from "@/components/Form/Select";
import { userRoleList, userStatusList } from "@/data/constant";
import Input from "@/components/Form/Input";

function AdminUsersView() {
  const dispatch = useDispatch<any>();
  const { pushToNewUser, pushToEditUser } = useRedirect();
  const [statusState, setStatusState] = useState({
    userId: "",
    isSuspended: false,
  });
  const [filters, setFilters] = useState({
    status: "",
    role: "",
    name: "",
  });

  useEffect(() => {
    dispatch(getAllUsersByAdmin());
  }, [dispatch]);

  const { users, error, loading } = useSelector<RootState, AdminUsersState>(
    (state) => state.adminUsers
  );

  useToastEffect({
    error,
    reset: resetAllUsersByAdmin,
    clear: clearAllUsersByAdmin,
  });

  const {
    message,
    error: statusError,
    loading: statusLoading,
  } = useSelector<RootState, APIState>((state) => state.password);

  useToastEffect({
    message: message,
    error: statusError,
    reset: resetAPIState,
    onSuccess: () => {
      setStatusState({ userId: "", isSuspended: false });
      dispatch(getAllUsersByAdmin());
    },
  });

  const handleChange = (e: any) => {
    setFilters((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const filteredUsers = users.filter((user) => {
    let condition = true;
    const status = user.isSuspended ? "Suspended" : "Active";

    if (filters.name) {
      condition =
        condition &&
        user.name.toLowerCase().includes(filters.name.toLowerCase());
    }
    if (filters.status) condition = condition && status === filters.status;
    if (filters.role) condition = condition && user.role === filters.role;

    return condition;
  });

  return (
    <section className="pt-3 sm:pt-14">
      <DeleteDialog
        actionLabel={statusState.isSuspended ? "Activate" : "Suspend"}
        open={!!statusState.userId}
        loading={statusLoading}
        onClose={() => setStatusState({ userId: "", isSuspended: false })}
        onDelete={() =>
          dispatch(
            updateUserStatusByAdmin(statusState.userId, {
              isSuspended: !statusState.isSuspended,
            })
          )
        }
        label={statusState.isSuspended ? "Activate user" : "Suspend user"}
        description={`Are you sure you want to ${
          statusState.isSuspended ? "activate" : "suspend"
        } this user?`}
      />
      {loading ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex xl:flex-row flex-col xl:justify-between xl:items-center xl:space-x-2 xl:space-y-0 space-y-3 mb-7">
            <h1 className="text-3xl font-bold">
              {users.length} AVAILABLE USER
              {users.length > 1 ? "S" : ""}
            </h1>
            <div className="flex flex-row flex-wrap items-center gap-3">
              <div>
                <Input
                  value={filters.name}
                  name="name"
                  placeholder="Search username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Select
                  className="w-[150px]"
                  list={userStatusList}
                  value={filters.status}
                  name="status"
                  displayEmpty
                  onChange={handleChange}
                />
              </div>
              <div>
                <Select
                  className="w-[150px]"
                  list={userRoleList}
                  value={filters.role}
                  name="role"
                  onChange={handleChange}
                  displayEmpty
                />
              </div>
              <div>
                <Button
                  className="w-full"
                  label="New User"
                  variant="contained"
                  color="primary"
                  size="xl"
                  startIcon={<AddIcon />}
                  onClick={pushToNewUser}
                />
              </div>
            </div>
          </div>
          {filteredUsers.length <= 0 ? (
            <EmptyRoom title="No users available." />
          ) : (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {filteredUsers.map((user) => (
                  <AdminUserCard
                    key={user._id}
                    user={user}
                    onEdit={() => pushToEditUser(user._id)}
                    onStatusChange={() =>
                      setStatusState({
                        userId: user._id,
                        isSuspended: user.isSuspended,
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

export default AdminUsersView;

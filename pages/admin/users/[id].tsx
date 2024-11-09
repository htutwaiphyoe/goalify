import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import EditUserView from "@/views/AdminUsersView/EditUserView";

function EditUserPage() {
  return (
    <>
      <Meta
        title={`Edit User - Hotel Valhalla`}
        description="Edit User in Hotel Valhalla"
      />
      <EditUserView />
    </>
  );
}

export default EditUserPage;

export const getServerSideProps = protectAuthorizedPage;

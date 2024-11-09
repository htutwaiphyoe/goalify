import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import NewUserView from "@/views/AdminUsersView/NewUserView";

function NewUserPage() {
  return (
    <>
      <Meta
        title={`New User - Hotel Valhalla`}
        description="New User in Hotel Valhalla"
      />
      <NewUserView />
    </>
  );
}

export default NewUserPage;

export const getServerSideProps = protectAuthorizedPage;

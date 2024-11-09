import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import AdminUsersView from "@/views/AdminUsersView";

function AdminUsersPage() {
  return (
    <>
      <Meta
        title={`All Users - Hotel Valhalla`}
        description="All User in Hotel Valhalla"
      />
      <AdminUsersView />
    </>
  );
}

export default AdminUsersPage;

export const getServerSideProps = protectAuthorizedPage;

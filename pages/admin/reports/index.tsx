import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import AdminReportsView from "@/views/AdminReportsView";

function AdminReportsPage() {
  return (
    <>
      <Meta
        title="Reports - Hotel Valhalla"
        description="Reports - Hotel Valhalla"
      />
      <AdminReportsView />
    </>
  );
}

export default AdminReportsPage;

export const getServerSideProps = protectAuthorizedPage;

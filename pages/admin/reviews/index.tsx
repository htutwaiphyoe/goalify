import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import AdminReviewsView from "@/views/AdminReviewsView";

function AdminReviewsPage() {
  return (
    <>
      <Meta
        title="All Reviews - Hotel Valhalla"
        description="All Reviews - Hotel Valhalla"
      />
      <AdminReviewsView />
    </>
  );
}

export default AdminReviewsPage;

export const getServerSideProps = protectAuthorizedPage;

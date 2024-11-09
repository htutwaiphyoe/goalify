import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import AdminPromotionsView from "@/views/AdminPromotionsView";

function AdminPromotionsPage() {
  return (
    <>
      <Meta
        title="All Promotions - Hotel Valhalla"
        description="All Promotions - Hotel Valhalla"
      />
      <AdminPromotionsView />
    </>
  );
}

export default AdminPromotionsPage;

export const getServerSideProps = protectAuthorizedPage;

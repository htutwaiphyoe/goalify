import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import EditPromotionView from "@/views/AdminPromotionsView/EditPromotionView";

function EditPromotionPage() {
  return (
    <>
      <Meta
        title="Edit Promotion - Hotel Valhalla"
        description="Edit Promotion - Hotel Valhalla"
      />
      <EditPromotionView />
    </>
  );
}

export default EditPromotionPage;

export const getServerSideProps = protectAuthorizedPage;

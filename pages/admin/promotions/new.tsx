import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import NewPromotionView from "@/views/AdminPromotionsView/NewPromotionView";

function NewPromotionPage() {
  return (
    <>
      <Meta
        title="New Promotion - Hotel Valhalla"
        description="New Promotion - Hotel Valhalla"
      />
      <NewPromotionView />
    </>
  );
}

export default NewPromotionPage;

export const getServerSideProps = protectAuthorizedPage;

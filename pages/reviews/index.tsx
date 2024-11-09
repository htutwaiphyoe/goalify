import { protectAuthenticatedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import MyReviewsView from "@/views/MyReviewsView";

function ReviewsPage() {
  return (
    <>
      <Meta
        title="My Reviews - Hotel Valhalla"
        description="My reviews in Hotel Valhalla"
      />
      <MyReviewsView />
    </>
  );
}

export default ReviewsPage;

export const getServerSideProps = protectAuthenticatedPage;

import Meta from "@/components/Meta";
import { protectUnAuthenticatedPage } from "@/configs/getServerSideProps";
import ForgotPasswordView from "@/views/ForgotPasswordView";

function ForgotPasswordPage() {
  return (
    <>
      <Meta
        title="Forgot Password - Hotel Valhalla"
        description="Account forgot password page for hotel valhalla"
      />
      <ForgotPasswordView />
    </>
  );
}

export default ForgotPasswordPage;

export const getServerSideProps = protectUnAuthenticatedPage;

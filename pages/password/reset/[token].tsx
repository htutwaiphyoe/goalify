import Meta from "@/components/Meta";
import { protectUnAuthenticatedPage } from "@/configs/getServerSideProps";
import ResetPasswordView from "@/views/ResetPasswordView";

function ResetPasswordPage() {
  return (
    <>
      <Meta
        title="Reset Password - Hotel Valhalla"
        description="Reset password for those who forgot their account password."
      />
      <ResetPasswordView />
    </>
  );
}

export default ResetPasswordPage;

export const getServerSideProps = protectUnAuthenticatedPage;

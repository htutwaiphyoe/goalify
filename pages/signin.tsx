import { protectUnAuthenticatedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import SignInView from "@/views/SignInView";

function SignInPage() {
  return (
    <>
      <Meta
        description="Sign In Hotel Valhalla"
        title="Sign In - Hotel Valhalla"
      />
      <SignInView />
    </>
  );
}

export default SignInPage;

export const getServerSideProps = protectUnAuthenticatedPage;

import { protectUnAuthenticatedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import SignUpView from "@/views/SignUpView";

function SignUpPage() {
  return (
    <>
      <Meta
        title="Sign Up - Hotel Valhalla"
        description="Create an account to book in Hotel Valhalla"
      />
      <SignUpView />
    </>
  );
}

export default SignUpPage;

export const getServerSideProps = protectUnAuthenticatedPage;

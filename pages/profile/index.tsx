import { protectAuthenticatedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import ProfileView from "@/views/ProfileView";

function ProfilePage(props: any) {
  return (
    <>
      <Meta
        title={`${props.session.user.name} - Hotel Valhalla`}
        description="User profile in Hotel Valhalla"
      />
      <ProfileView user={props.session.user} />
    </>
  );
}

export default ProfilePage;

export const getServerSideProps = protectAuthenticatedPage;

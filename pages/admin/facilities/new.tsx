import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import NewFacilityView from "@/views/AdminFacilitiesView/NewFacilityView";

function NewFacilityPage() {
  return (
    <>
      <Meta
        title="New Facility - Hotel Valhalla"
        description="New Facility - Hotel Valhalla"
      />
      <NewFacilityView />
    </>
  );
}

export default NewFacilityPage;

export const getServerSideProps = protectAuthorizedPage;

import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import EditFacilityView from "@/views/AdminFacilitiesView/EditFacilityView";

function EditFacilityPage() {
  return (
    <>
      <Meta
        title="Edit Facility - Hotel Valhalla"
        description="Edit Facility - Hotel Valhalla"
      />
      <EditFacilityView />
    </>
  );
}

export default EditFacilityPage;

export const getServerSideProps = protectAuthorizedPage;

import { protectAuthorizedPage } from "@/configs/getServerSideProps";
import Meta from "@/components/Meta";
import AdminFacilitiesView from "@/views/AdminFacilitiesView";

function AdminFacilitiesPage() {
  return (
    <>
      <Meta
        title="All Facilities - Hotel Valhalla"
        description="All Facilities - Hotel Valhalla"
      />
      <AdminFacilitiesView />
    </>
  );
}

export default AdminFacilitiesPage;

export const getServerSideProps = protectAuthorizedPage;

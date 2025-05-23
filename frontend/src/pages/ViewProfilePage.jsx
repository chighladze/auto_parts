import Breadcrumbs from "../components/Breadcrumbs";
import ViewProfileLayer from "../components/ViewProfileLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const ViewProfilePage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <ViewProfileLayer />
    </MasterLayout>
  );
};

export default ViewProfilePage;

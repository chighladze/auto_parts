import Breadcrumbs from "../components/Breadcrumbs";
import PartGroupsLayer from "../components/PartGroupsLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const PartGroupsPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <PartGroupsLayer />
    </MasterLayout>
  );
};

export default PartGroupsPage;

import Breadcrumbs from "../components/Breadcrumbs";
import PartSubgroupsLayer from "../components/PartSubgroupsLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const PartSubgroupsPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <PartSubgroupsLayer />
    </MasterLayout>
  );
};

export default PartSubgroupsPage;

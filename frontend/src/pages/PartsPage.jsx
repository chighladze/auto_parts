import Breadcrumbs from "../components/Breadcrumbs";
import PartsLayer from "../components/PartsLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const PartsPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <PartsLayer />
    </MasterLayout>
  );
};

export default PartsPage;

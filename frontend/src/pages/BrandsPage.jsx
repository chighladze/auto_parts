import BrandsLayer from "../components/BrandsLayer";
import Breadcrumbs from "../components/Breadcrumbs";
import MasterLayout from "../masterLayout/MasterLayout";

const BrandsPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <BrandsLayer />
    </MasterLayout>
  );
};

export default BrandsPage;

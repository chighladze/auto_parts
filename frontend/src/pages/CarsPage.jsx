import Breadcrumbs from "../components/Breadcrumbs";
import CarsLayer from "../components/CarsLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const CarsPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <CarsLayer />
    </MasterLayout>
  );
};

export default CarsPage;

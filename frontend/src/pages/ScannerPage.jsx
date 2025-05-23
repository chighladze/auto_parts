import Breadcrumbs from "../components/Breadcrumbs";
import ScannerLayer from "../components/ScannerLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const ScannerPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <ScannerLayer />
    </MasterLayout>
  );
};

export default ScannerPage;

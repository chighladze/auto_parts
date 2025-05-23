import Breadcrumbs from "../components/Breadcrumbs";
import LowStockLayer from "../components/LowStockLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const LowStockPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <LowStockLayer />
    </MasterLayout>
  );
};

export default LowStockPage;

import Breadcrumbs from "../components/Breadcrumbs";
import InventoryLayer from "../components/InventoryLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const InventoryPage = () => {
  return (
    <MasterLayout>
      <Breadcrumbs />
      <InventoryLayer />
    </MasterLayout>
  );
};

export default InventoryPage;

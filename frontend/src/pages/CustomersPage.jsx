import { Box } from "@mui/material";
import CustomerList from "../components/CustomerList";
import MasterLayout from "../masterLayout/MasterLayout";

const CustomersPage = () => {
  return (
    <MasterLayout>
      <Box p={2}>
        <CustomerList />
      </Box>
    </MasterLayout>
  );
};

export default CustomersPage;

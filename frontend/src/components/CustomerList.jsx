import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteCustomer, getCustomers } from "../api/customers";
import ConfirmDialog from "./ConfirmDialog";
import CustomerFormDialog from "./CustomerFormDialog";

const CustomerList = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCustomers({ search });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error loading customers:", error);
      enqueueSnackbar(t("errors.loadingCustomers"), { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [search, enqueueSnackbar, t]);

  useEffect(() => {
    loadCustomers();
  }, [search, loadCustomers]);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpenForm(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenForm(true);
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCustomer(customerToDelete.id);
      enqueueSnackbar(t("success.customerDeleted"), { variant: "success" });
      loadCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      enqueueSnackbar(t("errors.deletingCustomer"), { variant: "error" });
    } finally {
      setOpenConfirm(false);
      setCustomerToDelete(null);
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedCustomer(null);
  };

  const handleSave = () => {
    loadCustomers();
    handleCloseForm();
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">{t("titles.customers")}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          {t("buttons.addCustomer")}
        </Button>
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label={t("fields.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("fields.name")}</TableCell>
              <TableCell>{t("fields.email")}</TableCell>
              <TableCell>{t("fields.phone")}</TableCell>
              <TableCell>{t("fields.company")}</TableCell>
              <TableCell>{t("fields.companyName")}</TableCell>
              <TableCell>{t("fields.discount")}</TableCell>
              <TableCell>{t("fields.creditLimit")}</TableCell>
              <TableCell align="right">{t("fields.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {t("loading")}...
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {t("noData")}
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {customer.is_company ? t("yes") : t("no")}
                  </TableCell>
                  <TableCell>{customer.company_name}</TableCell>
                  <TableCell>{customer.discount_percent}%</TableCell>
                  <TableCell>{customer.credit_limit}</TableCell>
                  <TableCell align="right">
                    <Tooltip title={t("buttons.edit")}>
                      <IconButton
                        onClick={() => handleEdit(customer)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("buttons.delete")}>
                      <IconButton
                        onClick={() => handleDelete(customer)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomerFormDialog
        open={openForm}
        onClose={handleCloseForm}
        onSave={handleSave}
        customer={selectedCustomer}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title={t("dialogs.deleteCustomer.title")}
        content={t("dialogs.deleteCustomer.content")}
      />
    </Box>
  );
};

export default CustomerList;

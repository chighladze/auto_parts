import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { createCustomer, updateCustomer } from "../api/customers";

const CustomerFormDialog = ({ open, onClose, onSave, customer }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = Boolean(customer);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("validation.required")),
    email: Yup.string().email(t("validation.email")),
    phone: Yup.string(),
    address: Yup.string(),
    tax_number: Yup.string(),
    company_name: Yup.string(),
    is_company: Yup.boolean(),
    discount_percent: Yup.number()
      .min(0, t("validation.min", { value: 0 }))
      .max(100, t("validation.max", { value: 100 })),
    credit_limit: Yup.number().min(0, t("validation.min", { value: 0 })),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      tax_number: "",
      company_name: "",
      is_company: false,
      discount_percent: 0,
      credit_limit: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          await updateCustomer(customer.id, values);
          enqueueSnackbar(t("success.customerUpdated"), {
            variant: "success",
          });
        } else {
          await createCustomer(values);
          enqueueSnackbar(t("success.customerCreated"), {
            variant: "success",
          });
        }
        onSave();
      } catch (error) {
        console.error("Error saving customer:", error);
        enqueueSnackbar(
          t(isEdit ? "errors.updatingCustomer" : "errors.creatingCustomer"),
          { variant: "error" }
        );
      }
    },
  });

  useEffect(() => {
    if (customer) {
      formik.setValues({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        tax_number: customer.tax_number || "",
        company_name: customer.company_name || "",
        is_company: customer.is_company || false,
        discount_percent: customer.discount_percent || 0,
        credit_limit: customer.credit_limit || 0,
      });
    } else {
      formik.resetForm();
    }
  }, [customer, formik]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEdit ? t("titles.editCustomer") : t("titles.addCustomer")}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label={t("fields.name")}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label={t("fields.email")}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phone"
                label={t("fields.phone")}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label={t("fields.address")}
                value={formik.values.address}
                onChange={formik.handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="tax_number"
                label={t("fields.taxNumber")}
                value={formik.values.tax_number}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="company_name"
                label={t("fields.companyName")}
                value={formik.values.company_name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="is_company"
                    checked={formik.values.is_company}
                    onChange={formik.handleChange}
                  />
                }
                label={t("fields.isCompany")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="discount_percent"
                label={t("fields.discountPercent")}
                value={formik.values.discount_percent}
                onChange={formik.handleChange}
                error={
                  formik.touched.discount_percent &&
                  Boolean(formik.errors.discount_percent)
                }
                helperText={
                  formik.touched.discount_percent &&
                  formik.errors.discount_percent
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="credit_limit"
                label={t("fields.creditLimit")}
                value={formik.values.credit_limit}
                onChange={formik.handleChange}
                error={
                  formik.touched.credit_limit &&
                  Boolean(formik.errors.credit_limit)
                }
                helperText={
                  formik.touched.credit_limit && formik.errors.credit_limit
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("buttons.cancel")}</Button>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? t("buttons.save") : t("buttons.create")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomerFormDialog;

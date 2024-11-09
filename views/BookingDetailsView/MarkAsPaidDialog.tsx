import Dialog from "@/components/Dialog";
import Button from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import { paymentProviderList, paymentProviders } from "@/data/constant";
import { markAsPaidValidationSchema } from "@/data/schemas";
import { Form, Formik } from "formik";

type MarkAsPaidDialogProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: { paidWith: string; account: string }) => void;
};

function MarkAsPaidDialog({
  open,
  loading,
  onClose,
  onSubmit,
}: MarkAsPaidDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={{ paidWith: "", account: "" }}
        validateOnBlur
        validateOnChange
        enableReinitialize
        validationSchema={markAsPaidValidationSchema}
        onSubmit={async (values) => {
          await onSubmit({
            paidWith: values.paidWith,
            account:
              values.paidWith === paymentProviders.Cash ? "" : values.account,
          });
        }}
      >
        {({
          dirty,
          values,
          isValid,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit} className="grid gap-5">
              <h1 className="text-3xl font-bold mb-3">Mark as paid</h1>
              <Select
                label="Paid with"
                value={values.paidWith}
                onChange={handleChange}
                name="paidWith"
                list={paymentProviderList}
              />
              {values.paidWith !== paymentProviders.Cash && (
                <Input
                  value={values.account}
                  onChange={handleChange}
                  name="account"
                  label="Account"
                />
              )}
              <div className="flex justify-end items-center space-x-3">
                <Button
                  label="Close"
                  size="large"
                  type="button"
                  onClick={onClose}
                  variant="outlined"
                  color="primary"
                />
                <Button
                  label={isSubmitting ? "Loading..." : "Confirm"}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading || isSubmitting || !dirty || !isValid}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
}

export default MarkAsPaidDialog;

import { Form, Formik } from "formik";
import Button from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import { promotionValidationSchema } from "@/data/schemas";

type Props = {
  edit: boolean;
  onSubmit: (values: any) => Promise<any>;
  onBack: () => void;
  data: {
    name: string;
    percentRate: string;
  };
};

function PromotionForm({ data, edit, onSubmit, onBack }: Props) {
  return (
    <Formik
      initialValues={{ ...data }}
      enableReinitialize
      validateOnBlur
      validateOnChange
      validationSchema={promotionValidationSchema}
      onSubmit={async (values) => await onSubmit(values)}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <h2 className="text-3xl font-bold">
                {edit ? "Update" : "Add new"} promotion
              </h2>
              <Input
                label="Promotion Name*"
                name="name"
                value={values.name}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name && errors.name}
                error={touched.name && !!errors.name}
                placeholder="Enter promotion name"
              />
              <Input
                label="Percent Rate (%)*"
                name="percentRate"
                value={values.percentRate}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.percentRate && errors.percentRate}
                error={touched.percentRate && !!errors.percentRate}
                placeholder="Enter promotion percent rate"
              />
              <div className="flex justify-between items-center">
                <Button
                  label="Back to promotions"
                  variant="text"
                  type="button"
                  color="primary"
                  onClick={onBack}
                />
                <Button
                  type="submit"
                  size="large"
                  label={isSubmitting ? "Loading..." : edit ? "Save" : "Add"}
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting || !dirty || !isValid}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PromotionForm;

import { Form, Formik } from "formik";
import Button from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import { facilityValidationSchema } from "@/data/schemas";

type Props = {
  edit: boolean;
  onSubmit: (values: any) => Promise<any>;
  onBack: () => void;
  data: {
    name: string;
    description: string;
  };
};

function FacilityForm({ data, edit, onSubmit, onBack }: Props) {
  return (
    <Formik
      initialValues={{ ...data }}
      enableReinitialize
      validateOnBlur
      validateOnChange
      validationSchema={facilityValidationSchema}
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
                {edit ? "Update" : "Add new"} facility
              </h2>
              <Input
                label="Name*"
                name="name"
                value={values.name}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name && errors.name}
                error={touched.name && !!errors.name}
                placeholder="Enter facility name"
              />
              <Textarea
                label="Description*"
                placeholder="Enter facility description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.description && errors.description}
                error={touched.description && !!errors.description}
                rows={5}
              />
              <div className="flex justify-between items-center">
                <Button
                  label="Back to facilities"
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

export default FacilityForm;

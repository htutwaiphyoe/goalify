import { Formik, Form } from "formik";
import {
  updateProfileValidationSchema,
  userValidationSchema,
} from "@/data/schemas";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import DropZone from "@/components/Form/Dropzone";
import { readUploadFile } from "@/utils/helpers";
import Preferences from "../ProfileView/Preferences";
import Select from "@/components/Form/Select";
import { userRoleList } from "@/data/constant";
import PhoneInput from "@/components/Form/PhoneInput";

type UserFormProps = {
  user: NewUser;
  edit: boolean;
  onBack: () => void;
  onSubmit: (values: any) => Promise<any>;
};

function UserForm({ user, edit, onSubmit, onBack }: UserFormProps) {
  return (
    <Formik
      initialValues={{ ...user }}
      enableReinitialize
      validateOnBlur
      validateOnChange
      validationSchema={
        edit ? updateProfileValidationSchema : userValidationSchema
      }
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
        setFieldValue,
      }) => {
        return (
          <Form
            onSubmit={handleSubmit}
            className="grid gap-5"
            encType="multipart/form-data"
          >
            <h1 className="text-3xl font-bold">
              {edit ? "Update user" : "Add new user"}
            </h1>
            <DropZone
              value={values.avatar}
              onUpload={(uploadedFile) => {
                if (!uploadedFile) return setFieldValue("avatar", uploadedFile);
                readUploadFile({
                  file: uploadedFile,
                  onLoad: (file) => setFieldValue("avatar", file),
                });
              }}
              onRemove={() => setFieldValue("avatar", null)}
              helperText={touched.avatar && errors.avatar}
              error={touched.avatar && !!errors.avatar}
            />
            <Input
              label="Name*"
              name="name"
              value={values.name}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name && errors.name}
              error={touched.name && !!errors.name}
              placeholder="John Doe"
            />
            <Input
              label="Email address*"
              name="email"
              value={values.email}
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email && errors.email}
              error={touched.email && !!errors.email}
              placeholder="johndoe@example.com"
            />
            <PhoneInput
              label="Phone (Optional)"
              value={values.phone}
              onChange={(value) => setFieldValue("phone", value)}
              onBlur={handleBlur}
              helperText={touched.phone && errors.phone}
              error={touched.phone && !!errors.phone}
              placeholder="+123456789"
            />
            <Input
              label="Password*"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password && errors.password}
              error={touched.password && !!errors.password}
              placeholder="**********"
            />
            <Select
              label="Role"
              list={userRoleList.filter((role) => role.value)}
              value={values.role}
              onChange={handleChange}
              name="role"
            />
            <hr className="my-2 mx-4" />
            <Preferences
              preferences={values.preferences}
              onChange={setFieldValue}
            />
            <div className="flex justify-between space-x-2 items-center">
              <Button
                type="button"
                size="medium"
                label="Back to users"
                color="primary"
                variant="text"
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
          </Form>
        );
      }}
    </Formik>
  );
}

export default UserForm;

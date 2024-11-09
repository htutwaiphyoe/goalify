import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { updateProfileValidationSchema } from "@/data/schemas";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import DropZone from "@/components/Form/Dropzone";
import { updateProfile } from "@/redux/actions/userActions";
import { resetPasswordState } from "@/redux/actions/userActions";
import useToastEffect from "@/hooks/useToastEffect";
import { readUploadFile, updateSession } from "@/utils/helpers";
import Preferences from "./Preferences";
import PhoneInput from "@/components/Form/PhoneInput";

function ProfileView({ user }: { user: SessionUser }) {
  const dispatch = useDispatch<any>();

  const { error, message } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetPasswordState,
    onSuccess: updateSession,
  });

  return (
    <section className="pt-5 sm:pt-14 flex items-center justify-center">
      <div className="p-5 sm:p-10 border rounded-xl w-500 shadow-sm">
        <Formik<SignUpValues>
          initialValues={{
            avatar: user.avatar.url,
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: "",
            preferences: user.preferences,
          }}
          enableReinitialize
          validateOnBlur
          validateOnChange
          validationSchema={updateProfileValidationSchema}
          onSubmit={async (values) => {
            const body = {
              ...values,
              avatar: values.avatar === user.avatar.url ? null : values.avatar,
            };
            await dispatch(updateProfile(body));
          }}
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
                <h1 className="text-3xl font-bold">Update your Profile</h1>
                <DropZone
                  value={values.avatar}
                  onUpload={(uploadedFile) => {
                    if (!uploadedFile)
                      return setFieldValue("avatar", uploadedFile);
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
                <hr className="my-2 mx-4" />
                <Preferences
                  preferences={values.preferences}
                  onChange={setFieldValue}
                />
                <div className="flex justify-end items-center">
                  <Button
                    type="submit"
                    size="large"
                    label={isSubmitting ? "Loading..." : "Save"}
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting || !dirty || !isValid}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}

export default ProfileView;

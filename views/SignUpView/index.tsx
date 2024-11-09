import { Formik, Form } from "formik";
import { signUpValidationSchema } from "@/data/schemas";
import Link from "next/link";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import DropZone from "@/components/Form/Dropzone";
import { signup, resetPasswordState } from "@/redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import useRedirect from "@/hooks/useRedirect";
import PhoneInput from "@/components/Form/PhoneInput";

function SignUpView() {
  const dispatch = useDispatch<any>();
  const { replaceWithHome } = useRedirect();
  const { error, message } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetPasswordState,
    onSuccess: replaceWithHome,
  });

  return (
    <section className="pt-3 sm:pt-14 flex items-center justify-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <Formik<SignUpValues>
          initialValues={{
            avatar: null,
            name: "",
            email: "",
            phone: "",
            password: "",
          }}
          validateOnBlur
          validateOnChange
          validationSchema={signUpValidationSchema}
          onSubmit={async (values) => {
            await dispatch(signup(values));
          }}
        >
          {({
            dirty,
            values,
            errors,
            touched,
            isValid,
            isSubmitting,
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
                <h1 className="text-3xl font-bold">Join to Hotel Valhalla</h1>
                <DropZone
                  value={values.avatar}
                  onUpload={(file) => {
                    if (!file) return setFieldValue("avatar", file);
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2)
                        setFieldValue("avatar", fileReader.result);
                    };
                    fileReader.readAsDataURL(file);
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
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center sm:space-y-0 space-y-3 sm:space-x-3">
                  <Link
                    href="/password/forgot"
                    className="text-primary font-bold text-base"
                  >
                    Forgot password?
                  </Link>
                  <Button
                    type="submit"
                    size="large"
                    label={isSubmitting ? "Loading..." : "Sign up"}
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting || !dirty || !isValid}
                  />
                </div>
                <hr className="my-1 mx-10" />
                <Link
                  href="/signin"
                  className="text-primary text-center text-sm"
                >
                  Already have an account?
                </Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}

export default SignUpView;

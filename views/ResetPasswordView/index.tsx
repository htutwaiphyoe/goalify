import { Formik, Form } from "formik";
import useToastEffect from "@/hooks/useToastEffect";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { resetPasswordValidationSchema } from "@/data/schemas";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetPasswordState } from "@/redux/actions/userActions";
import { useRouter } from "next/router";
import useRedirect from "@/hooks/useRedirect";

function ResetPasswordView() {
  const dispatch = useDispatch<any>();
  const { replaceWithSignIn } = useRedirect();
  const router = useRouter();
  const { error, message } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({
    error,
    message,
    reset: resetPasswordState,
    onSuccess: replaceWithSignIn,
  });

  return (
    <section className="pt-3 sm:pt-14 flex items-center justify-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validateOnBlur
          validateOnChange
          enableReinitialize
          validationSchema={resetPasswordValidationSchema}
          onSubmit={async (values) => {
            await dispatch(
              resetPassword({
                token: router.query.token as string,
                password: values.newPassword,
                confirmPassword: values.confirmPassword,
              })
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <Form onSubmit={handleSubmit} className="grid gap-5">
                <h1 className="text-3xl font-bold">Reset password</h1>
                <Input
                  label="New Password*"
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.newPassword && errors.newPassword}
                  error={touched.newPassword && !!errors.newPassword}
                  placeholder="**********"
                />
                <Input
                  label="Confirm Password*"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  placeholder="**********"
                />
                <div className="text-right">
                  <Button
                    type="submit"
                    size="large"
                    label={isSubmitting ? "Loading..." : "Reset now"}
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting || !isValid}
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

export default ResetPasswordView;

import { Formik, Form } from "formik";
import useToastEffect from "@/hooks/useToastEffect";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import { forgotPasswordValidationSchema } from "@/data/schemas";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  resetPasswordState,
} from "@/redux/actions/userActions";

function ForgotPasswordView() {
  const dispatch = useDispatch<any>();
  const { error, message } = useSelector<RootState, APIState>(
    (state) => state.password
  );

  useToastEffect({ error, message, reset: resetPasswordState });

  return (
    <section className="pt-3 sm:pt-14 flex items-center justify-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <Formik
          initialValues={{ email: "" }}
          validateOnBlur
          validateOnChange
          enableReinitialize
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={async (values, actions) => {
            await dispatch(forgotPassword(values.email));
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
                <h1 className="text-3xl font-bold">Forgot password</h1>
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
                <div className="text-right">
                  <Button
                    type="submit"
                    size="large"
                    label={isSubmitting ? "Loading..." : "Send email"}
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

export default ForgotPasswordView;

import { Formik, Form } from "formik";
import { signInValidationSchema } from "@/data/schemas";
import Link from "next/link";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import useAuth from "@/hooks/useAuth";

function SignInView() {
  const { signIn } = useAuth();

  return (
    <section className="pt-3 sm:pt-14 flex items-center justify-center">
      <div className="p-3 sm:p-10 border rounded-xl w-500 shadow-sm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnBlur
          validateOnChange
          validationSchema={signInValidationSchema}
          onSubmit={async (values) =>
            await signIn(values.email, values.password)
          }
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <Form onSubmit={handleSubmit} className="grid gap-5">
                <h1 className="text-3xl font-bold">Sign in</h1>
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
                    label={isSubmitting ? "Loading..." : "Sign in"}
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting || !dirty || !isValid}
                  />
                </div>
                <hr className="my-1 mx-10" />
                <Link
                  href="/signup"
                  className="text-primary text-center text-sm"
                >
                  Do not have an account?
                </Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}

export default SignInView;

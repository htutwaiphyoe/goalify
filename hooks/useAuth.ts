import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useAuth = () => {
  const router = useRouter();

  const handleSignOut = async ({
    callbackUrl = "/signin",
    message = "Logout success",
    shownToast = true,
  }) => {
    const data = await signOut({ redirect: false, callbackUrl });
    shownToast && toast.success(message);
    router.replace(data.url);
  };

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    result?.error
      ? toast.error(result.error)
      : (toast.success("Sign in success."), router.replace("/"));
  };

  return {
    signOut: handleSignOut,
    signIn: handleSignIn,
  };
};

export default useAuth;

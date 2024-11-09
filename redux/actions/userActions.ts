import { Dispatch } from "redux";
import valhallaAxios from "@/configs/valhallaAxios";
import { headers } from "@/data/constant";
import { signIn } from "next-auth/react";

export const signup =
  (user: SignUpValues) => async (dispatch: Dispatch<APIAction>) => {
    try {
      const response = await valhallaAxios.post("auth/signup", user, headers);
      await signIn("credentials", {
        redirect: false,
        ...response.data.data.user,
      });
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const updateProfile =
  (user: SignUpValues) => async (dispatch: Dispatch<APIAction>) => {
    try {
      const response = await valhallaAxios.put("profile", user, headers);
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const forgotPassword =
  (email: string) => async (dispatch: Dispatch<APIAction>) => {
    try {
      const response = await valhallaAxios.post(
        "password/forgot",
        { email },
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const resetPassword =
  (data: { token: string; password: string; confirmPassword: string }) =>
  async (dispatch: Dispatch<APIAction>) => {
    try {
      const response = await valhallaAxios.put(
        `password/reset/${data.token}`,
        { password: data.password, confirmPassword: data.confirmPassword },
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const resetPasswordState =
  () => async (dispatch: Dispatch<APIAction>) => {
    dispatch({ type: "RESET", payload: null });
  };

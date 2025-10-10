import type { ActionFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { authApi } from "@/api";
import api from "@/api";
export const loginAction = async ({ request }: ActionFunctionArgs) => {
  // request=user input to login
  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //   response=api response to user

  try {
    const response = await authApi.post("login", authData);
    if (response.status == 200) {
      const redirectTo =
        new URL(request.url).searchParams.get("redirect") || "/";
      return redirect(redirectTo);
    }
    return { error: response.data || "Login failed" };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "login failed" };
    } else throw error;
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");

    return redirect("/login");
  } catch (error) {
    console.log("logout failed", error);
  }
};

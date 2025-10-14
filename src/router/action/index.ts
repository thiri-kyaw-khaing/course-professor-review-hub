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
      if (response.data.userRole === "USER") {
        const redirectTo =
          new URL(request.url).searchParams.get("redirect") || "/";
        return redirect(redirectTo);
      } else {
        return redirect("/admin");
      }
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

export const reviewProfessorAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const reviewData = {
    professorId: formData.get("professorId"),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  };

  try {
    const response = await api.post("users/reviews", reviewData);
    if (response.status === 201 || response.data.success) {
      // optionally redirect or return success
      return redirect(`/professors/${reviewData.professorId}`);
    } else {
      return { error: response.data.message || "Failed to post review" };
    }
  } catch (error: any) {
    return { error: error.response?.data?.message || "Server error" };
  }
};

export const reviewCourseAction = async ({ request }: ActionFunctionArgs) => {
  alert("course review action called");
  const formData = await request.formData();
  const reviewData = {
    courseId: formData.get("courseId"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  };

  console.log("📤 Sending review data:", reviewData);

  try {
    const response = await api.post("users/reviews", reviewData);
    if (response.status === 201 || response.data.success) {
      return redirect(`/courses/${reviewData.courseId}`);
    } else {
      return { error: response.data.message || "Failed to post review" };
    }
  } catch (error: any) {
    return { error: error.response?.data?.message || "Server error" };
  }
};

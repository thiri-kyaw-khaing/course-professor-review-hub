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

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  // request=user input to login
  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
  };

  //   response=api response to user

  try {
    const response = await authApi.post("register", authData);
    console.log("Register response:", response);
    if (response.status == 200) {
      return redirect("/register/otp");
    }
    return { error: response.data || "Register failed" };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Register failed" };
    } else throw error;
  }
};

export const createCourseAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const courseData = {
    code: formData.get("courseCode"),
    title: formData.get("courseName"),
    credits: Number(formData.get("credits")),
    faculty: formData.get("faculty"),
    description: formData.get("description"),
  };

  try {
    const response = await api.post("/admins/courses", courseData);
    if (response.status === 201 || response.data.success) {
      return redirect("/admin/courses");
    } else {
      return { error: response.data.message || "Failed to create course" };
    }
  } catch (error: any) {
    return { error: error.response?.data?.message || "Server error" };
  }
};

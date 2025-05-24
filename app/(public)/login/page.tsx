"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { setCookie } from "cookies-next";
import styles from "./login.module.scss";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4, "Password too short").required("Password is required"),
});
interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormValues) => {
    const { email, password } = data;

    if (email === "admin@example.com" && password === "admin123") {
      setCookie("authToken", "mocked_admin_token", {
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles["login__container"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["login__form"]}>
        <h2>Admin Login</h2>
        <TextInput
          label="Email"
          name="email"
          placeholder="admin@example.com"
          register={register}
          error={errors.email?.message}
        />
        <TextInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <Button className={styles["btn-login"]}>Login</Button>
      </form>
    </div>
  );
}

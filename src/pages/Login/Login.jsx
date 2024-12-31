import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../Context/User.context";

export default function Login() {
  let { setToken } = useContext(UserContext);

  const [incorrectEmailOrPasswordError, setIncorrectEmailOrPasswordError] =
    useState(null);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password must be at least  eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  async function sendDataToLogin(values) {
    const toastLoadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("User logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIncorrectEmailOrPasswordError(error.response.data.message);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <h1 className="text-lg text-slate-700 font-semibold mb-5">
        <i className="fa-solid fa-circle-user mr-2"></i> Login Now
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="email">
          <input
            type="text"
            placeholder="Email Address "
            className="form-control w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 mt-1">*{formik.errors.email}</p>
          )}
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Password "
            className="form-control w-full"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 mt-1">*{formik.errors.password}</p>
          )}
          {incorrectEmailOrPasswordError && (
            <p className="text-red-600 mt-1">
              *{incorrectEmailOrPasswordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn w-full bg-primary-700 hover:bg-primary-800 text-white"
        >
          Login
        </button>
      </form>
    </>
  );
}

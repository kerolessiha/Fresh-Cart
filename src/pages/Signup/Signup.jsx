import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be at least 3 character")
      .max(25, "Name can not be more than 20 character"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password must be at least  eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf(
        [ref("password")],
        "password and confirm password should be the same "
      ),
    phone: string()
      .required("Phone number is requires")
      .matches(phoneRegex, "Sorry we acept only egyptian numbers"),
  });
  async function sendDataToRegister(values) {
    const toastLoadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.dismiss(toastLoadingId);
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setAccountExistError(error.response.data.message);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <h1 className="text-lg text-slate-700 font-semibold mb-5">
        <i className="fa-solid fa-circle-user mr-2"></i> Register Now
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="name">
          <input
            type="text"
            placeholder="Type your name "
            className="form-control w-full"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600 mt-1">*{formik.errors.name}</p>
          )}
        </div>
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
          {accountExistError && (
            <p className="text-red-600 mt-1">*{accountExistError}</p>
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
        </div>
        <div className="rePassword">
          <input
            type="password"
            placeholder="Confirm Password "
            className="form-control w-full"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-600 mt-1">*{formik.errors.rePassword}</p>
          )}
        </div>
        <div className="phone">
          <input
            type="tel"
            placeholder=" Phone number "
            className="form-control w-full"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-600 mt-1">*{formik.errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn w-full bg-primary-700 hover:bg-primary-800 text-white"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

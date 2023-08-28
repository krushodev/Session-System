import { useFormik } from "formik";

import {  useAuth } from "../context/authContext";
import { AuthResponse } from "../types";
import { Redirect } from "wouter";

const LoginForm = () => {
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = async(values: { email: string, password: string }) => {
    try {
      const response = await fetch("http://localhost:8085/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const data: AuthResponse = await response.json();

      auth?.saveUser(data);

    } catch (error) {
      console.log(error);
    }
  }

  if (auth?.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={formik.handleChange} name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" onChange={formik.handleChange} name="password" id="password" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default LoginForm;

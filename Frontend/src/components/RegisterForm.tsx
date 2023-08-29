import { useFormik } from "formik";
import { useAuth } from "../context/authContext";
import { Redirect } from "wouter";
import { AuthResponseError } from "../types";
import { useState } from "react";

const RegisterForm = () => {
  const auth = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = async(values: { username: string, email: string, password: string }) => {
    try {
      const response = await fetch("http://localhost:8085/api/sessions/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      if (!(response.ok)) {
        const data: AuthResponseError = await response.json();
        alert(`${data.error}`);
        
        return;
      }

      alert("Registro exitoso");

      setIsRegistered(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (auth?.isAuthenticated) {
    return <Redirect to="/" />
  }

  else if (isRegistered) {
    return <Redirect to="/login" />
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={formik.handleChange} name="username" id="username"/>
      </div>
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

export default RegisterForm;

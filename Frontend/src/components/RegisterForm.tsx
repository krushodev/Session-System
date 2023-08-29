import { useFormik } from "formik";
import { useAuth } from "../context/authContext";
import { Redirect } from "wouter";

const RegisterForm = () => {
  const auth = useAuth();

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

  const handleSubmit = async(data: { username: string, email: string, password: string }) => {
    try {
      await fetch("http://localhost:8085/api/sessions/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      alert("Registro exitoso");

    } catch (error) {
      console.log(error);
    }
  }

  if (auth?.isAuthenticated) return <Redirect to="/" />

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

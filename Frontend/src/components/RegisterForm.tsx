import { useFormik } from "formik";
import { useAuth } from "../context/authContext";
import { Redirect } from "wouter";
import { AuthResponseError } from "../types";
import { useState } from "react";
import * as yup from "yup";

import { Box, Button, FormControl, Stack, TextField } from "@mui/material";

const RegisterForm = () => {
  const auth = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  const validationSchema = yup.object({
    username: yup.string().required("Please enter a valid username").max(32),
    email: yup.string().email().required("Invalid email address. Make sure to use a valid format, such as 'example@email.com'."),
    password: yup.string().min(8).required("Password must be at least 8 characters").trim(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: { username: string; email: string; password: string }) => {
    console.log(values);

    try {
      const response = await fetch("http://localhost:8085/api/sessions/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data: AuthResponseError = await response.json();
        alert(`${data.error}`);

        return;
      }

      alert("Registro exitoso");

      setIsRegistered(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (auth?.isAuthenticated) {
    return <Redirect to="/" />;
  } else if (isRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <Box component="form" sx={{ maxWidth: "100%" }} onSubmit={formik.handleSubmit}>
      <Stack spacing={{ xs: 5, md: 7 }} sx={{ width: "80%", m: "0 auto", maxWidth: "30em" }}>
        <FormControl>
          <TextField label="Username" error={Boolean(formik.errors.username)} helperText={formik.errors.username} onChange={formik.handleChange} name="username" />
        </FormControl>
        <FormControl>
          <TextField label="Email" error={Boolean(formik.errors.email)} helperText={formik.errors.email} onChange={formik.handleChange} name="email" />
        </FormControl>
        <FormControl>
          <TextField label="Password" type="password" error={Boolean(formik.errors.password)} helperText={formik.errors.password} onChange={formik.handleChange} name="password" />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ width: "100%", p: "0.8em" }}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;

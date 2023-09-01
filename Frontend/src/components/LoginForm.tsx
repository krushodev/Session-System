import { useFormik } from "formik";
import { Redirect } from "wouter";
import * as yup from "yup";

import { useAuth } from "../context/authContext";
import { AuthResponse, AuthResponseError } from "../types";

import { Box, Button, FormControl, Stack, TextField } from "@mui/material";

const LoginForm = () => {
  const auth = useAuth();

  const validationSchema = yup.object({
    email: yup.string().email().required("Invalid email address. Make sure to use a valid format, such as 'example@email.com'."),
    password: yup.string().min(8).required("Password must be at least 8 characters").trim()
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:8085/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        auth?.saveUserData(data);

        return;
      }

      const data: AuthResponseError = await response.json();

      alert(`${data.error}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (auth?.isAuthenticated) return <Redirect to="/" />;

  return (
    <Box component="form" sx={{ maxWidth: "100%" }} onSubmit={formik.handleSubmit}>
      <Stack spacing={{ xs: 5, md: 7 }} sx={{ width: "80%", m: "0 auto", maxWidth: "30em" }}>
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

export default LoginForm;

import { useFormik } from "formik";
import { Redirect } from "wouter";

import {  useAuth } from "../context/authContext";
import { AuthResponse, AuthResponseError } from "../types";

import { Box, Button, FormControl, Stack, TextField } from "@mui/material";

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
  }

  if (auth?.isAuthenticated) return <Redirect to="/" />

  return (
    <Box component="form" sx={{ maxWidth: "100%" }} onSubmit={formik.handleSubmit}>
      <Stack spacing={{ xs: 5, md: 7 }} sx={{ width: "80%", m: "0 auto", maxWidth: "30em"}}>
        <FormControl>
          <TextField label="Email" type="email" onChange={formik.handleChange} name="email"/>
        </FormControl>
        <FormControl>
          <TextField label="Password" type="password" onChange={formik.handleChange} name="password" />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ width: "100%", p: "0.8em" }}>Enviar</Button>
      </Stack>
    </Box>
  );
}

export default LoginForm;

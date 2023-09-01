import { Container, Typography } from "@mui/material";
import { useAuth } from "../context/authContext";

const Private = () => {
  const user = useAuth()!.getUser();

  return (
    <Container
      sx={{
        p: "2.5em",
      }}
    >
      {user ? (
        <Typography component="h2" sx={{ fontSize: "2em", textAlign: "center" }}>
          ¡Welcome, {user.username}!
        </Typography>
      ) : (
        <h1>Loading data...</h1>
      )}
    </Container>
  );
};

export default Private;

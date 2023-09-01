import { Link } from "wouter";

import { useAuth } from "../context/authContext";
import { Box, Button } from "@mui/material";

const Navbar = () => {
  const auth = useAuth();

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: { xs: 3, md: 5 },
        p: "20px",
        bgcolor: "whitesmoke",
        mb: "9em",
        fontSize: "1em",
      }}
    >
      {auth?.isAuthenticated ? (
        <>
          <Button variant="contained">
            <Box component={Link} color="inherit" to="/">
              Private
            </Box>
          </Button>
          <Button variant="outlined">
            <Box component={Link} color="inherit" to="/login" onClick={auth?.logout}>
              Logout
            </Box>
          </Button>
        </>
      ) : (
        <>
          <Button variant="contained">
            <Box component={Link} color="inherit" to="/login">
              Login
            </Box>
          </Button>
          <Button variant="outlined">
            <Box component={Link} color="inherit" to="/signup">
              Signup
            </Box>
          </Button>
        </>
      )}
    </Box>
  );
};

export default Navbar;

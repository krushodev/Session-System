import { Link } from "wouter";

import { useAuth } from "../context/authContext";

const Navbar = () => {

  const auth = useAuth();

  return(
    (auth?.isAuthenticated) ?
      <nav>
        <Link to="/">Private</Link>
        <Link to="/login" onClick={auth?.logout}>Logout</Link>
      </nav> : 
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
  )
}

export default Navbar;

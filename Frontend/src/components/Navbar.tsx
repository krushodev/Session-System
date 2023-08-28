import { Link } from "wouter";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Private</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  )
}

export default Navbar;

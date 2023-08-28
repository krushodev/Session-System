import { Route } from "wouter"

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Private from "./components/Private";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Route path="/" component={Private} />
      <Route path="/signup" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
    </>
  )
}

export default App

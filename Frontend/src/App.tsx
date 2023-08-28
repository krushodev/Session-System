import { Route } from "wouter"

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Private from "./components/Private";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/helper/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar/>
      <Route path="/">
        <ProtectedRoute>
          <Private />
        </ProtectedRoute>
      </Route>
      <Route path="/signup" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
    </>
  )
}

export default App

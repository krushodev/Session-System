import { useAuth } from "../context/authContext";

const Private = () => {
  const user = useAuth()!.getUser();

  return (
    <div>
        { user ? <h2>Hola { user.username }</h2> : <h1>Cargando datos...</h1> }
    </div>
  )
}

export default Private

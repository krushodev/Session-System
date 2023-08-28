import { useAuth } from "../context/authContext"

const Private = () => {

  const auth = useAuth();

  console.log(auth?.getAccessToken());

  return (
    <div>
        <h1>This a private section</h1>
    </div>
  )
}

export default Private

import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext";

import { User } from "../types";

const Private = () => {
  // const [userInfo, setUserInfo] = useState<User | null>(null);

  const user = useAuth()?.getUser();

  /* useEffect(() => {
    const loadData = async() => {
      const response = await fetch("http://localhost:8085/api/sessions/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth?.getAccessToken()}`
        }
      });

      
      const data: User = (await response.json()).data;
      
      console.log(data);
      setUserInfo(data);
    }

    loadData();
  }, [auth]); */

  return (
    <div>
        { user ? <h2>Hola { user?.username }</h2> : <h1>Cargando datos...</h1> }
    </div>
  )
}

export default Private

import { Redirect } from "wouter";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    
    if (auth?.isAuthenticated) {
        return children;
    }

    return <Redirect to="/login" />
}

export default ProtectedRoute;

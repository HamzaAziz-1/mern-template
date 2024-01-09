import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { user } = useGlobalContext();

  // If there's no user, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }


  // Allow access to the route for authorized users
  return children;
};

export default PrivateRoute;

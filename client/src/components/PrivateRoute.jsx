import { Navigate } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, roles }) => {
const user = useSelector(selectUser)
  // If there's no user, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // Allow access to the route for authorized users
  return children;
};

export default PrivateRoute;

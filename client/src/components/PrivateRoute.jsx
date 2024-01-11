import { Navigate } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, roles }) => {
  const token = Cookies.get('token')
  console.log(token)
  // const user = useSelector(selectUser);
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Allow access to the route for authorized users
  return children;
};

export default PrivateRoute;

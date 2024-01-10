import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

function Dashboard() {
  const user = useSelector(selectUser);

  return (
    <>
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>
    </>
  );
}

export default Dashboard;

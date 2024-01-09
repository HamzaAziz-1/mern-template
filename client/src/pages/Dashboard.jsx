import React from "react";
import { useGlobalContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useGlobalContext();
  return <>
  <h3>{user.name}</h3>
  <h3>{user.email}</h3>
  </>;
}

export default Dashboard;

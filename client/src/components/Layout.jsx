import Router from "../router/Router";
import NavBar from "./NavBar";
import { useGlobalContext } from "../context/AuthContext";
import React from "react";
import Spinner from "./Spinner";
function Layout() {

  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <NavBar />
      <Router />
    </>
  );
}

export default Layout;

import Router from "../router/Router";
import NavBar from "./NavBar";
import { selectIsLoading } from "../features/user/userSlice";
import React from "react";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
function Layout() {

  const isLoading = useSelector(selectIsLoading)
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

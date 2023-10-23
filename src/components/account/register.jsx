import { Navigate } from "react-router-dom";
import { isLogged } from "./account.info";

export const Register = ({ notify }) => {
  if (isLogged()) {
    notify("You are already logged it, log out to access the page.");
    return <Navigate to={"/"} />;
  }
  return <>Registration page.</>;
};

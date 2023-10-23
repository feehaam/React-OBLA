import { Navigate } from "react-router-dom";
import { clearInfo } from "./account.info";

export const Logout = ({ notify }) => {
  notify("Logout succeeded.", "");
  clearInfo();
  return <Navigate to={"/login"} />;
};

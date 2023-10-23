import { Navigate, Outlet } from "react-router-dom";
import {
  clearInfo,
  getRole,
  isAdmin,
  isCustomer,
  isLogged,
} from "./account.info";

export const Authenticate = ({ requiredRole, notify }) => {
  console.log("Required role: " + requiredRole + ", user role: " + getRole());

  if (
    (requiredRole === "ANY" ||
      requiredRole === "CUSTOMER" ||
      requiredRole === "ADMIN") &&
    !isLogged()
  ) {
    notify("You must login to access the page.", "danger");
    return <Navigate to={"/login"} />;
  }

  if (requiredRole === "ADMIN" && isCustomer()) {
    notify(
      "Forbidden action. You don't have right to browse this page.",
      "danger"
    );
    clearInfo();
    return <Navigate to={"/login"} />;
  }

  if (requiredRole === "CUSTOMER" && isAdmin()) {
    notify(
      "Forbidden action. You don't have right to browse this page.",
      "danger"
    );
    clearInfo();
    return <Navigate to={"/login"} />;
  }

  console.log("Serving user the contents.");
  return <Outlet />;
};

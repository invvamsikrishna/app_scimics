import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ type, auth }) => {
  return auth.isAuthenticated && type.includes(auth.user?.user_type) ? (
    <Outlet />
  ) : (
    <Navigate to="/404" replace />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);

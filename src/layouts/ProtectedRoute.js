import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ auth, type }) => {
  return auth.isAuthenticated && auth.user?.user_type == type ? <Outlet /> : <Navigate to="/404" replace />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);

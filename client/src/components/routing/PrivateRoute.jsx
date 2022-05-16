import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = auth;

  if (!isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
  //   return (
  //     <Route
  //       {...rest}
  //       element={(props) =>
  //         !isAuthenticated && !loading ? (
  //           <Navigate to="/" replace />
  //         ) : (
  //           <Component {...props} />
  //         )
  //       }
  //     />
  //   );
};

export default PrivateRoute;

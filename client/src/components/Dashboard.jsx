import React from "react";
import { useSelector } from "react-redux";
import StoragePlaces from "./storagePlaces";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  return (
      <>
      <StoragePlaces />
      </>
  );
};

export default Dashboard;

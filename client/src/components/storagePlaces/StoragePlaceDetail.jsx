import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, removeAlert } from "../../slices/alert/alertSlice";
import Alert from "../Layout/Alert";
import { Link, useParams } from "react-router-dom";

const StoragePlaceDetail = () => {
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const params = useParams();
  const alertMsg = useSelector((state) => state.alert.msg);
  const alertType = useSelector((state) => state.alert.alertType);

  const dispatch = useDispatch();

  const handleRemoveAlert = () => {
    dispatch(removeAlert());
  };

  useEffect(() => {
    const loadFoodItems = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`/api/fooditems/${params.id}`);
        setFoodItems(res.data);
        setLoading(false);
      } catch (err) {
        setFoodItems([]);
        dispatch(
          setAlert({
            msg: "No food items found for this storage place",
            alertType: "danger",
          })
        );
        setLoading(false);
      }
    };

    loadFoodItems();
  }, []);

  if (loading) {
    return <h1>Loading!</h1>;
  }

  console.log(foodItems)

  return (
    <>
    {alertMsg !== "" ? (
        <>
          <Alert
            alertMsg={alertMsg}
            alertType={alertType}
            removeAlert={handleRemoveAlert}
          />
        </>
      ) : null}
      {foodItems.map(f => (
          <h2>{f.name}</h2>
      ))}
      <Link to="/dashboard">
          <button>Back to dashboard</button>
      </Link>
    </>
  );
};

export default StoragePlaceDetail;

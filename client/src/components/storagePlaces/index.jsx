import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, removeAlert } from "../../slices/alert/alertSlice";
import Alert from "../Layout/Alert";
import StoragePlace from "./StoragePlace";

const StoragePlaces = () => {
  const [loading, setLoading] = useState(false);
  const [storagePlaces, setStoragePlaces] = useState([]);
  const alertMsg = useSelector((state) => state.alert.msg);
  const alertType = useSelector((state) => state.alert.alertType);

  const dispatch = useDispatch();

  const handleRemoveAlert = () => {
      dispatch(removeAlert());
  }

  useEffect(() => {
      const loadStoragePlaces = async () => {
        setLoading(true);

        try {
            const res = await axios.get('/api/storageplaces');
            setStoragePlaces(res.data);
            setLoading(false);
        } catch (err) {
            setStoragePlaces([]);
            dispatch(setAlert({ msg: "No storage places found for this user", alertType: "danger" }))
            setLoading(false);
        }
      }

      loadStoragePlaces();
  }, [])

  if (loading) {
    return <h1>Loading!</h1>
  }

  return <div>
      {alertMsg !== "" ? (
        <>
          <Alert
            alertMsg={alertMsg}
            alertType={alertType}
            removeAlert={handleRemoveAlert}
          />
        </>
      ) : null}
      {storagePlaces.map(st => (
        <StoragePlace key={`storage-pl-${st._id}`} name={st.name} storageType={st.storageType} id={st._id}/>
      ))}
  </div>;
};

export default StoragePlaces;

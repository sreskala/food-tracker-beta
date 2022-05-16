import React from "react";
import { Link } from "react-router-dom";

const StoragePlace = ({ id, name, storageType }) => {
  return (
    <div>
      <Link to={`/storageplaces/${id}`}>
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => console.log("Clicked: ", name)}
        >
          {name}
        </h2>
      </Link>
      <h2>{storageType}</h2>
    </div>
  );
};

export default StoragePlace;

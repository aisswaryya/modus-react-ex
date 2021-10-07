/* eslint-disable-next-line no-use-before-define */
import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import Loader from "./Loader";

export default function App() {
  let [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= userData.length) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch("https://ecomm-products.modus.workers.dev/")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
  userData.length = 5;
  return (
    <div className="text-center p-2">
      <h1 className="font-bold text-3xl text-gray-800 my-2">
        Product List{" "}
        <div
          className="loading-container"
          style={{ display: loading ? "block" : "none" }}
        >
          <Loader />
        </div>
        <table
          style={{ opacity: loading ? "0" : "1" }}
          className={!loading ? "table-data" : ""}
        >
          <thead>
            <th>Title</th>
            <th>Image</th>
          </thead>
          <tbody>
            {userData.map((value, i) => (
              <tr key={value.title} className="parent">
                <td>{value.title}</td>
                <td>
                  <img
                    width={"50px"}
                    height={"50px"}
                    alt={value.title}
                    src={value.images[0]}
                    onLoad={imageLoaded}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </h1>
    </div>
  );
}

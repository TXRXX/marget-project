import React, { useState, useEffect } from "react";
import { getUser, getAvailableShops } from '../../service/todo';
import "./Shops.css";
import { Nav, Card } from '../../components';

const Shops = () => {
  const [user, setUser] = useState();
  const [shops, setShops] = useState([]);

  const onGetUserAndAvialableShops = async () => {
    await getUser().then((response) => {
      setUser(response.userResponse);
    });
    await getAvailableShops().then((response) => {
      setShops(response);
    });
  };
  useEffect(() => {
    onGetUserAndAvialableShops();
  }, []);

  return (
    <div>
      <Nav user={user} />
      <div class="shops-wrapper">
        <div class="grid-container">
          {shops?.map((shop) => (
            <Card shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shops;

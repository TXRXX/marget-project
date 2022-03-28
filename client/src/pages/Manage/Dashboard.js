import React, { useState, useEffect } from "react";
import { getUser, getUserShops, deleteShop } from '../../service/todo';
import "./Dashboard.css";
import { Nav, Modal, Loading } from '../../components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetUserAndShops = async () => {
    await getUser().then(async (response) => {
      setUser(response.userResponse);
      await getUserShops(response.userResponse._id).then((shopResponse) => {
        setShops(shopResponse);
      });
    });
  };

  useEffect(() => {
    onGetUserAndShops();
  }, []);

  const onDeleteShop = async (shopId) => {
    await deleteShop(shopId);
  };

  return (
    <div>
      <Nav user={user} />
      <div class="dashboard-wrapper">
        {loading && (
          <Loading />
        )}
        <div class="btn-wrapper">
          <span class="dashboard-title">Dashboard</span>
          <Modal user={user} shops={shops} setShops={setShops} setLoading={setLoading} />
          <button class="add-shop" type="button" data-modal-toggle="large-modal">
            ADD NEW SHOP
          </button>
        </div>

        <div class="status-container">
          <table>
            <thead>
              <th>No</th>
              <th>Shop Title</th>
              <th>Shop Description</th>
              <th>Status</th>
              <th>Manage</th>
            </thead>
            {shops.map((shop, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{shop.name}</td>
                <td>{shop.description}</td>
                <td>{shop.status}</td>
                <td>
                  <a href='/dashboard' onClick={() => onDeleteShop(shop._id)}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </a>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

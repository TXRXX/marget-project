import React, { useState, useEffect } from "react";
import { getUser, getAllShopsByAdmin, adminApproveShop, adminUnapproveShop, deleteShop } from "../../service/todo";
import "./Dashboard.css";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";

const Controlpanel = () => {
  const [user, setUser] = useState();
  const [shops, setShops] = useState([]);

  const onGetAdminAndShops = async () => {
    await getUser().then(async (response) => {
      setUser(response.userResponse);
      await getAllShopsByAdmin().then((shopResponse) => {
        setShops(shopResponse);
      });
    });
  };

  useEffect(() => {
    onGetAdminAndShops();
  }, []);

  const onApprovedShop = async (shopId) => {
    await adminApproveShop(shopId);
  };

  const onUnapprovedShop = async (shopId) => {
    await adminUnapproveShop(shopId);
  };

  const onDeleteShop = async (shopId) => {
    await deleteShop(shopId);
  };

  return (
    <div>
      <Navbar user={user} />
      <div class="dashboard-wrapper">
        <div class="btn-wrapper">
          <span class="dashboard-title">Control Panel</span>
        </div>
        <div class="status-container">
          <table>
            <thead>
              <th>No</th>
              <th>Shop Title</th>
              <th>Shop Description</th>
              <th>Contact</th>
              <th>Categories</th>
              <th>Manage</th>
            </thead>
            {shops?.map((shop, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{shop.name}</td>
                <td>{shop.description}</td>
                <td>{shop.contact}</td>
                <td>{shop.categories.join(', ')}</td>
                <td>
                  {!shop.isApproved ? (
                    <>
                      <a className="no-padding" href='/controlpanel' onClick={() => onApprovedShop(shop._id)}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="manage-icon manage-check"
                        ></FontAwesomeIcon>
                      </a>
                      <a className="no-padding" href="/controlpanel" onClick={() => onUnapprovedShop(shop._id)}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="manage-icon Xmark"
                        ></FontAwesomeIcon>
                      </a>
                    </>
                  ) : (
                    <a className="no-padding" href='/controlpanel' onClick={() => onDeleteShop(shop._id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="manage-icon"
                      ></FontAwesomeIcon>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Controlpanel;

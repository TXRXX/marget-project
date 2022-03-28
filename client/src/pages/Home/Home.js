import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import { getUser, getAvailableShops } from '../../service/todo';
import { logout } from '../../service/auth';
import { Nav, Card } from '../../components';


const Home = () => {
  const [user, setUser] = useState();
  const [shops, setShops] = useState([]);
  let navigate = useNavigate();

  const onGetUser = async () => {
    await getUser().then((response) => {
      setUser(response.userResponse);
    });
  };
  const onGetAvailableShops = async () => {
    await getAvailableShops().then((response) => {
      const shops = response;
      if (shops.length > 10) {
        setShops(shops.slice(0, 10));
      } else {
        setShops(response);
      }
    });
  };
  useEffect(() => {
    onGetUser();
    onGetAvailableShops();
  }, []);

  useEffect(() => {
    const refreshCount = parseInt(sessionStorage.getItem("refreshCount"));
    if (refreshCount < 2) {
      sessionStorage.setItem('refreshCount', String(refreshCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('refreshCount');
    }
  }, []);

  const onLogout = async () => {
    await logout();
    setUser(null);
    sessionStorage.setItem("refreshCount", 1);
    navigate('/login');
  };

  return (
    <div>
      <Nav user={user} logout={onLogout} />
      <div class="home-wrapper">
        <span class="welcome-text">FREE SPACE FOR PROMOTE YOUR SHOP</span>
        <div class="grid-container">
          {shops?.map((shop) => (
            <Card shop={shop} />
          ))}
        </div>
        <a href={user ? '/shops' : '/login'} class="more-shop-btn">
          MORE SHOPS
        </a>
      </div>
    </div>
  );
};

export default Home;

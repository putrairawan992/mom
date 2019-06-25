/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Menu, Icon } from "antd";
import OrderChina from "../../pages/OrderChina";

const MenuAdminChina = props => {
  useEffect(() => {
    changeMenu(0);
  }, []);

  const changeMenu = menu => {
    switch (menu) {
      case 1:
        props.onChange(<h1>Satu</h1>);
        break;
      case 2:
        props.onChange(<h1>Dua</h1>);
        break;
      case 3:
        props.onChange(<OrderChina />);
        break;
      case 4:
        props.logout();
      break;
      default:
        props.onChange(<OrderChina />);
    }
  };

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
      <Menu.Item key="1" onClick={() => changeMenu(1)}>
        <Icon type="bar-chart" />
        <span className="nav-text">Dashboard</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeMenu(2)}>
        <Icon type="shop" />
        <span className="nav-text">Product</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => changeMenu(3)}>
        <Icon type="cloud-o" />
        <span className="nav-text">Order</span>
      </Menu.Item>
      <Menu.Item key="4" onClick={() => changeMenu(4)}>
        <Icon type="cloud-o" />
        <span className="nav-text">Logout</span>
      </Menu.Item>
    </Menu>
  );
};

export default MenuAdminChina;

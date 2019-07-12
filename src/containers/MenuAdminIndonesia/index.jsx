/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Menu, Icon } from "antd";
import OrderIndonesia from "../../pages/OrderIndonesia";
import strings from "../../localization";
import "./style.sass";

const MenuAdminIndonesia = props => {
  useEffect(() => {
    changeMenu(0);
  }, []);

  const changeMenu = menu => {
    switch (menu) {
      case 1:
        props.onChange(<h1>Dashboard</h1>);
        break;
      case 2:
        props.onChange(<h1>Product</h1>);
        break;
      case 3:
        props.onChange(<OrderIndonesia />);
        break;
      default:
        props.onChange(<OrderIndonesia />);
    }
  };

  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={["3"]}>
      <Menu.Item key="1" onClick={() => changeMenu(1)}>
        <div className="menu-sidebar">
          <Icon type="bar-chart" />
          <span className="nav-text">{strings.dashboard}</span>
        </div>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeMenu(2)}>
        <div className="menu-sidebar">
          <Icon type="shop" />
          <span className="nav-text">{strings.product}</span>
        </div>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => changeMenu(3)}>
        <div className="menu-sidebar">
          <Icon type="cloud-o" />
          <span className="nav-text">{strings.order_indonesia}</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default MenuAdminIndonesia;

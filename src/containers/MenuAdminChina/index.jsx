/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Menu, Icon } from "antd";
import OrderChina from "../../pages/OrderChina";
import strings from "../../localization";
import Product from "../../pages/Product";
import "./style.sass";

const MenuAdminChina = props => {
  useEffect(() => {
    changeMenu(3);
  }, []);

  const changeMenu = menu => {
    switch (menu) {
      case 1:
        props.onChange(<h1>Dashboard</h1>);
        break;
      case 2:
        props.onChange(<Product />);
        break;
      case 3:
        props.onChange(<OrderChina />);
        break;
      default:
        props.onChange(<OrderChina />);
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
          <Icon type="shopping-cart" />
          <span className="nav-text">{strings.order}</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default MenuAdminChina;

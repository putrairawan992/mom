/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Menu, Icon } from "antd";
import OrderChina from "../../pages/OrderChina";
import strings from "../../localization";
import Product from "../../pages/Product";
import GlobalStateProduct from '../../context/GlobalStateProduct'
import "./style.sass";
import Products from "../../pages/Products";

const MenuAdminChina = props => {
  useEffect(() => {
    changeMenu(3);
  }, []);

  const menus = [
    {
      icon: "bar-chart",
      name: strings.dashboard
    },
    {
      icon: "shop",
      name: strings.product
    },
    {
      icon: "shopping-cart",
      name: strings.order
    },
    {
      icon: "shopping-cart",
      name: "Customer"
    },
  ];

  const changeMenu = menu => {
    switch (menu) {
      case 1:
        props.onChange(<h1>Dashboard</h1>);
        break;
      case 2:
        props.onChange(
        <GlobalStateProduct>
          <Product />
        </GlobalStateProduct>);
        break;
      case 3:
        props.onChange(<OrderChina />);
        break;
      case 4:
        props.onChange(<OrderChina />);
        break;
      default:
        props.onChange(<OrderChina />);
    }
  };

  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={["3"]}>
      {menus.map((menu, idx) => {
        const menuIndex = idx + 1;
        return (
          <Menu.Item key={menuIndex} onClick={() => changeMenu(menuIndex)}>
            <div className="menu-sidebar">
              <Icon type={menu.icon} />
              <span className="nav-text">{menu.name}</span>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default MenuAdminChina;

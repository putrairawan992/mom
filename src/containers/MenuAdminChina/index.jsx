/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Menu, Icon } from "antd";
import OrderChina from "../../pages/OrderChina";
import strings from '../../localization';
import Product from '../../pages/Product'


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
        props.onChange(<Product/>);
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
        <span className="nav-text">{strings.dashboard}</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeMenu(2)}>
        <Icon type="shop" />
        <span className="nav-text">{strings.product}</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => changeMenu(3)}>
        <Icon type="cloud-o" />
        <span className="nav-text">{strings.order}</span>
      </Menu.Item>
      <Menu.Item key="4" onClick={() => changeMenu(4)}>
        <Icon type="cloud-o" />
        <span className="nav-text">{strings.logout}</span>
      </Menu.Item>
    </Menu>
  );
};

export default MenuAdminChina;

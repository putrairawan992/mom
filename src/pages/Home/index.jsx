import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import DashboardContainer from "../../containers/Dashboard";
const { Header, Content, Sider } = Layout;

const Home = () => {
  const [menu, setMenu] = useState([]);

  const changeMenu = menu => {
    setMenu(menu);
  };

  const showMenu = menu => {
    switch (menu) {
      case 1:
        return <h1>Satu</h1>;
      case 2:
        return <h1>Dua</h1>;
      case 3:
        return <DashboardContainer />;
      default:
        return <DashboardContainer />;
    }
  };

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: 0 }} />

      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
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
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div style={{ padding: 12, background: "#fff" }}>
              {showMenu(menu)}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;

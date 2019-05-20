import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/Header";
import MenuAdminChina from "../../containers/MenuAdminChina";

const { Content, Sider } = Layout;

const MainLayout = ()=> {
  const [page, setPage] = useState([]);

  const actionChangePage = page => {
    setPage(page);
  }

  return (
    <Layout>
      <Header />
      <div className="container" style={{marginTop: '64px'}}>
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
          <MenuAdminChina onChange={actionChangePage} />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div style={{ padding: 12, background: "#fff" }}>
                  {page}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </Layout>
  );
};

export default MainLayout;

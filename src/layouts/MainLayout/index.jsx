import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/Header";
import MenuAdminChina from "../../containers/MenuAdminChina";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authentication";

const { Content, Sider } = Layout;

const MainLayout = (props) => {
  const [page, setPage] = useState([]);

  const actionChangePage = page => {
    setPage(page);
  }
  
  const childrenWithProps = React.cloneElement(props.children, {actionChangePage: actionChangePage, logout: props.logout});

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
          {childrenWithProps}
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

function mapStateToProps(state) {
  return { isAuthenticated: state.authentication.isAuthenticated };
}

export default connect(mapStateToProps,{logout})(MainLayout);

import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authentication";
import MenuProfile from "../../components/MenuProfile";

const { Content, Sider } = Layout;

const MainLayout = props => {
  const [page, setPage] = useState([]);

  const actionChangePage = page => {
    setPage(page);
  };

  const childrenWithProps = React.cloneElement(props.children, {
    actionChangePage: actionChangePage,
    logout: props.logout
  });

  const actionLogout = ()=> {
    props.logout();
  }

  return (
    <Layout>
      <Header />
      <div className="container" style={{ marginTop: "64px" }}>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              background: "#fff"
            }}
          >
            <MenuProfile
              admin="Darmawan"
              photo={require("../../assets/img/logo_monggopesen/ic_logo_bag_borderteal.png")}
              code="AO012"
              logout={actionLogout}
            />
            {childrenWithProps}
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content>
              <div style={{ padding: 12, background: "#fff" }}>{page}</div>
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

export default connect(
  mapStateToProps,
  { logout }
)(MainLayout);

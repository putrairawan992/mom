import React, {useEffect} from "react";
import { Layout, Menu, Icon } from "antd";
import Header from "../../components/Header";
import MenuProfile from "../../components/MenuProfile";
import PATH_URL from "../../routers/path";
import { useRootContext } from "../../hoc/RootContext";
import { withRouter } from "react-router-dom";
import GlobalStateProduct from "../../context/GlobalStateProduct";
const {SubMenu} = Menu;
const { Content, Sider } = Layout;

const MainLayout = props => {
  const {handleLogout, isAuthenticated} = useRootContext();
  useEffect(()=>{
    if(!isAuthenticated){
      props.history.push('/login');
    }
  },[isAuthenticated]);

  const childrenWithProps = React.cloneElement(props.children, {
    logout: props.logout
  });

  const actionLogout = ()=> {
    handleLogout();
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
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["product"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="product"
                title={
                  <span>
                    <Icon type="shopping" />
                    Product
                  </span>
                }
              >
                <Menu.Item key="1" onClick={()=>props.history.push(PATH_URL.PRODUCT_LIST)}>List Product</Menu.Item>
                <Menu.Item key="2" onClick={()=>props.history.push(PATH_URL.PRODUCT_CREATE)}>Add Product</Menu.Item>
                <Menu.Item key="3" onClick={()=>props.history.push(PATH_URL.PRODUCT_EDIT)}>Edit Product</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content>
              <div style={{ padding: 12, background: "#fff" }}><GlobalStateProduct>{childrenWithProps}</GlobalStateProduct></div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </Layout>
  );
};



export default (withRouter)(MainLayout);

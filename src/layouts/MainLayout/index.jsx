import React, {useEffect} from "react";
import { Layout, Menu, Icon } from "antd";
import Header from "../../components/Header";
import MenuProfile from "../../components/MenuProfile";
import PATH_URL from "../../routers/path";
import { useRootContext } from "../../hoc/RootContext";
import GlobalStateProduct from "../../context/GlobalStateProduct";
const {SubMenu} = Menu;
const { Content, Sider } = Layout;

export default function MainLayout(props) {
  const {handleLogout, isAuthenticated, history} = useRootContext();

  const childrenWithProps = React.cloneElement(props.children, {
    logout: props.logout
  });

  useEffect(() => {
    if(props.needAuthenticated && !isAuthenticated) {
      history.push('/login');
    }
  })

  if(props.needAuthenticated && !isAuthenticated){
    return null;
  } else {
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
                logout={() => handleLogout()}
              />
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu
                  key="dashboard"
                  title={
                    <span>
                      <Icon type="dashboard" />
                      Dashboard
                    </span>
                  }
                >
                  <Menu.Item key="1" onClick={()=>history.push(PATH_URL.DASHBOARD)}>Dashboard</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="product"
                  title={
                    <span>
                      <Icon type="shopping" />
                      Product
                    </span>
                  }
                >
                  <Menu.Item key="2" onClick={()=>history.push(PATH_URL.PRODUCT)}>List Product</Menu.Item>
                  <Menu.Item key="3" onClick={()=>history.push(PATH_URL.PRODUCT_CREATE)}>Add Product</Menu.Item>
                  <Menu.Item key="4" onClick={()=>history.push(PATH_URL.PRODUCT_EDIT)}>Categories</Menu.Item>
                  <Menu.Item key="8" onClick={()=>history.push(PATH_URL.PRODUCT_QUESTIONS)}>Product Questions</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="order"
                  title={
                    <span>
                      <Icon type="shopping-cart" />
                      Order
                    </span>
                  }
                >
                  <Menu.Item key="9" onClick={()=> history.push(PATH_URL.ORDER)}>List Order</Menu.Item>
                  <Menu.Item key="10" onClick={()=>history.push(PATH_URL.ORDER_CANCLE)}>Cancle Order</Menu.Item>
                  <Menu.Item key="11" onClick={()=>history.push(PATH_URL.ORDER_COMPLETED)}>Completed Order</Menu.Item>
                  
                </SubMenu>
                <SubMenu
                  key="supplier"
                  title={
                    <span>
                      <Icon type="solution" />
                      Supplier
                    </span>
                  }
                >
                  <Menu.Item key="12" onClick={()=>history.push(PATH_URL.SUPPLIER)}>Supplier List</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="customer"
                  title={
                    <span>
                      <Icon type="profile" />
                      Customer
                    </span>
                  }
                >
                  <Menu.Item key="13" onClick={()=>history.push(PATH_URL.CUSTOMER)}>Customer List</Menu.Item>
                  <Menu.Item key="14" onClick={()=>history.push(PATH_URL.CUSTOMER_GROUPS)}>Customer Groups</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
              <Content>
                <div style={{ padding: 12, background: "#fff" }}>{childrenWithProps}</div>
              </Content>
            </Layout>
          </Layout>
        </div>
      </Layout>
    );  
  }
};
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ListNeedResponse from "../../containers/ListNeedResponse";
import ListPurchased from "../../containers/ListPurchased";
import ListReady from "../../containers/ListReady";
import ListNeedPurchased from "../../containers/ListNeedPurchase";
import ListShipped from "../../containers/ListShipped";

const TabPane = Tabs.TabPane;
const OrderChina = () => {
  //const [orders, setOrders] = useState([]);

  const changeTab = (key) => {
    switch(key) {
      case "NRP":
        break;
      case "NPC":
        break;
      case "PCD":
        break;
      case "RDY":
        break;
      case "FTE":
        break;
      default :
    }
  }

  return (
    <Tabs defaultActiveKey="NRP" type="itable-card" onChange={changeTab}>
      <TabPane tab="Need Response" key="NRP">
        <ListNeedResponse/>
      </TabPane>
      <TabPane tab="Need Purchase" key="NPC">
        <ListNeedPurchased />
      </TabPane>
      <TabPane tab="Purchased" key="PCD">
        <ListPurchased />
      </TabPane>
      <TabPane tab="Ready To Ship" key="RDY">
        <ListReady />
      </TabPane>
      <TabPane tab="Shipped" key="FTE">
        <ListShipped />
      </TabPane>
    </Tabs>
  );
};

export default OrderChina;

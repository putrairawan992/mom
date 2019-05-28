import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ListNeedResponse from "../../containers/ListNeedResponse";
import ListPurchased from "../../containers/ListPurchased";
import ListReady from "../../containers/ListReady";
import ListNeedPurchased from "../../containers/ListNeedPurchase";
import ListFowarded from "../../containers/ListFowarded";
import { dataNeedResponse } from "../../dataSource/need_response";

const TabPane = Tabs.TabPane;
const Order = () => {
  const [orders, setOrders] = useState([]);

  const changeTab = (key) => {
    setOrders([]);

    switch(key) {
      case "NRP":
        const data = getDataListNeedResponse();
        setOrders(data);
        break;
      case "NPC":
        break;
      case "PCD":
        break;
      case "RDY":
        break;
      case "FTE":
        break;
    }
  }

  useEffect(() => {
    const data = getDataListNeedResponse();
    setOrders(data);
  }, []);

  const getDataListNeedResponse = () => {
    return dataNeedResponse.data;
  }

  return (
    <Tabs defaultActiveKey="NRP" type="itable-card" onChange={changeTab}>
      <TabPane tab="Need Response" key="NRP">
        {orders.length > 0 &&
          <ListNeedResponse data={orders} />
        }
      </TabPane>
      <TabPane tab="Need Purchase" key="NPC">
        <ListNeedPurchased />
      </TabPane>
      <TabPane tab="Purchased" key="PCD">
        <ListPurchased />
      </TabPane>
      <TabPane tab="Ready" key="RDY">
        <ListReady />
      </TabPane>
      <TabPane tab="Fowarded to Ekspedition" key="FTE">
        <ListFowarded />
      </TabPane>
    </Tabs>
  );
};

export default Order;

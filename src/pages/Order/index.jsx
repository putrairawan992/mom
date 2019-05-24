import React from "react";
import { Tabs } from "antd";
import ListNeedResponse from "../../containers/ListNeedResponse";
import ListPurchased from "../../containers/ListPurchased";
import ListReady from "../../containers/ListReady";
import ListNeedPurchased from "../../containers/ListNeedPurchase";
import ListFowarded from "../../containers/ListFowarded";

const TabPane = Tabs.TabPane;
const Order = () => {
  return (
    <Tabs defaultActiveKey="1" type="itable-card">
      <TabPane tab="Need Response" key="1">
        <ListNeedResponse />
      </TabPane>
      <TabPane tab="Need Purchase" key="2">
        <ListNeedPurchased />
      </TabPane>
      <TabPane tab="Purchased" key="3">
        <ListPurchased />
      </TabPane>
      <TabPane tab="Ready" key="4">
        <ListReady />
      </TabPane>
      <TabPane tab="Fowarded to Ekspedition" key="5">
        <ListFowarded />
      </TabPane>
    </Tabs>
  );
};

export default Order;

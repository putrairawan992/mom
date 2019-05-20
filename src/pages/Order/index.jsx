import React from "react";
import { Tabs } from "antd";
import ListNeedResponse from "../../containers/ListNeedResponse";
import ListPurchased from "../../containers/ListPurchased";

const TabPane = Tabs.TabPane;
const Order = () => {
  return (
    <Tabs defaultActiveKey="1" type="itable-card">
      <TabPane tab="Need Response" key="1">
        <ListNeedResponse />
      </TabPane>
      <TabPane tab="Need Purchase" key="2">
        <ListPurchased />
      </TabPane>
      <TabPane tab="Purchased" key="3">
        Purchased
      </TabPane>
      <TabPane tab="Ready" key="4">
        Ready
      </TabPane>
      <TabPane tab="Fowarded to Ekspedition" key="5">
        Fowarded to Ekspedition
      </TabPane>
    </Tabs>
  );
};

export default Order;

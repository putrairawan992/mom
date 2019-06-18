import React from "react";
import { Tabs } from "antd";
import ListArrival from "../../containers/ListArrival";
import ListReadyPickUp from "../../containers/ListReadyPickUp";
import ListPickedUp from "../../containers/ListPickedUp";
import ListDelivered from "../../containers/ListDelivered";

const TabPane = Tabs.TabPane;
const OrderIndonesia = () => {
  return (
    <Tabs defaultActiveKey="1" type="itable-card">
      <TabPane tab="Arrival" key="1">
        <ListArrival />
      </TabPane>
      <TabPane tab="Ready For Courier To Pick Up" key="2">
        <ListReadyPickUp />
      </TabPane>
      <TabPane tab="Picked Up By Courier" key="3">
        <ListPickedUp />
      </TabPane>
      <TabPane tab="Delivered To Customer" key="4">
        <ListDelivered />
      </TabPane>
    </Tabs>
  );
};

export default OrderIndonesia;

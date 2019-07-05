import React from "react";
import { Tabs } from "antd";
import ListArrival from "../../containers/ListArrival";
import ListReadyPickUp from "../../containers/ListReadyPickUp";
import ListPickedUp from "../../containers/ListPickedUp";
import ListDelivered from "../../containers/ListDelivered";
import strings from '../../localization'

const TabPane = Tabs.TabPane;
const OrderIndonesia = () => {
  return (
    <Tabs defaultActiveKey="1" type="itable-card">
      <TabPane tab={strings.tab_indo_arrival} key="1">
        <ListArrival />
      </TabPane>
      <TabPane tab={strings.tab_indo_ready_to_pickup} key="2">
        <ListReadyPickUp />
      </TabPane>
      <TabPane tab={strings.tab_indo_pickup_by_courier} key="3">
        <ListPickedUp />
      </TabPane>
      <TabPane tab={strings.tab_indo_delivered} key="4">
        <ListDelivered />
      </TabPane>
    </Tabs>
  );
};

export default OrderIndonesia;

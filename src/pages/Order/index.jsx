import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ListNeedResponse from "../../containers/ListNeedResponse";
import ListPurchased from "../../containers/ListPurchased";
import ListReady from "../../containers/ListReady";
import ListNeedPurchased from "../../containers/ListNeedPurchase";
import ListShipped from "../../containers/ListShipped";
import { dataNeedResponse } from "../../dataSource/need_response";
import strings from "../../localization"

const TabPane = Tabs.TabPane;
const Order = () => {
  const [orders, setOrders] = useState([]);
  const { 
    tabChinaNeedResponse,
    tabChinaNeedPurchase,
    tabChinaPurchased,
    tabChinaReadyToShip,
    tabChinaShipped
   } = window.localization

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
      default :
      setOrders(data);
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
      <TabPane tab={strings.tab_china_need_response} key="NRP">
        {orders.length > 0 &&
          <ListNeedResponse data={orders} />
        }
      </TabPane>
      <TabPane tab={strings.tab_china_need_purchase} key="NPC">
        <ListNeedPurchased />
      </TabPane>
      <TabPane tab={strings.tab_china_purcahsed} key="PCD">
        <ListPurchased />
      </TabPane>
      <TabPane tab={strings.tab_china_ready_to_ship} key="RDY">
        <ListReady />
      </TabPane>
      <TabPane tab={strings.tab_china_shipped} key="FTE">
        <ListShipped />
      </TabPane>
    </Tabs>
  );
};

export default Order;

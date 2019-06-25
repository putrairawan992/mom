import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ListNeedResponse from "../../containers/ListNeedResponse";
import ListPurchased from "../../containers/ListPurchased";
import ListReadyToShip from "../../containers/ListReady";
import ListNeedPurchased from "../../containers/ListNeedPurchase";
import ListShipped from "../../containers/ListShipped";
import { apiGetWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";

const TabPane = Tabs.TabPane;
const OrderChina = () => {
  const [resListNeedResponse, setResListNeedResponse] = useState([]);
  const [resTotalNeedResponse, setResTotalNeedResponse] = useState(0);
  const [resListNeedPurchase, setResListNeedPurchase] = useState([]);
  const [resTotalNeedPurchase, setResTotalNeedPurchase] = useState(0);
  const [resListPurchased, setResListPurchased] = useState([]);
  const [resTotalPurchased, setResTotalPurchased] = useState(0);
  const [resListReadyToShip, setResListReadyToShip] = useState([]);
  const [resTotalReadyToShip, setResTotalReadyToShip] = useState(0);
  const [resListShipped, setResListShipped] = useState([]);
  const [resTotalShipped, setResTotalShipped] = useState(0);

  const changeTab = key => {
    switch (key) {
      case "NRP":
        getListNeedResponse();
        break;
      case "NPR":
        getListNeedPurchase();
        break;
      case "PRC":
        getListPurchased();
        break;
      case "RTS":
        break;
      case "SHP":
        break;
      default:
        getListNeedResponse();
    }
  };

  useEffect(() => {
    getListNeedResponse();
  }, []);

  const getListNeedResponse = async () => {
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/NRP`);
      setResListNeedResponse(response.data.data.invoices);
      setResTotalNeedResponse(response.data.data.total);
    } catch (error) {
      setResListNeedResponse([]);
      setResTotalNeedResponse(0);
    }
  };

  const getListNeedPurchase = async () => {
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/NPR`);
      setResListNeedPurchase(response.data.data.invoices);
      setResTotalNeedPurchase(response.data.data.total);
    } catch (error) {
      setResListNeedPurchase([]);
      setResTotalNeedPurchase(0);
    }
  };

  const getListPurchased = async () => {
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/PRC`);
      setResListPurchased(response.data.data.invoices);
      setResTotalPurchased(response.data.data.total);
    } catch (error) {
      setResListPurchased([]);
      setResTotalPurchased(0);
    }
  };

  const getListReadyToShip = async () => {
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/RTS`);
      setResListReadyToShip(response.data.data.invoices);
      setResTotalReadyToShip(response.data.data.total);
    } catch (error) {
      setResListReadyToShip([]);
      setResTotalReadyToShip(0);
    }
  };

  const getListShipped = async () => {
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/SHP`);
      setResListShipped(response.data.data.invoices);
      setResTotalShipped(response.data.data.total);
    } catch (error) {
      setResListShipped([]);
      setResTotalShipped(0);
    }
  };

  return (
    <Tabs defaultActiveKey="NRP" type="itable-card" onChange={changeTab}>
      <TabPane tab="Need Response" key="NRP">
        <ListNeedResponse
          invoices={resListNeedResponse}
          total={resTotalNeedResponse}
          onLoad={()=>getListNeedResponse()}
        />
      </TabPane>
      <TabPane tab="Need Purchase" key="NPR">
        <ListNeedPurchased 
          invoices={resListNeedPurchase}
          total={resTotalNeedPurchase}
          onLoad={()=>getListNeedPurchase()}
        />
      </TabPane>
      <TabPane tab="Purchased" key="PRC">
        <ListPurchased 
          invoices={resListPurchased}
          total={resTotalPurchased}
          onLoad={()=>getListPurchased()}
        />
      </TabPane>
      <TabPane tab="Ready To Ship" key="RTS">
        <ListReadyToShip 
          invoices={resListReadyToShip}
          total={resTotalReadyToShip}
          onLoad={()=>getListReadyToShip()}
        />
      </TabPane>
      <TabPane tab="Shipped" key="SHP">
        <ListShipped 
          invoices={resListShipped}
          total={resTotalShipped}
          onLoad={()=>getListShipped()}
        />
      </TabPane>
    </Tabs>
  );
};

export default OrderChina;

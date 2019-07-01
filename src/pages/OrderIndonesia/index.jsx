import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ListArrival from "../../containers/ListArrival";
import ListReadyPickUp from "../../containers/ListReadyPickUp";
import ListPickedUp from "../../containers/ListPickedUp";
import ListDelivered from "../../containers/ListDelivered";
import strings from "../../localization";
import { apiGetWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";

const TabPane = Tabs.TabPane;
const OrderIndonesia = () => {
  const [resListArrival, setResListArrival] = useState([]);
  const [resTotalArrival, setResTotalArrival] = useState(0);
  const [resListReadyPickUp, setResListReadyPickUp] = useState([]);
  const [resTotalReadyPickUp, setResTotalReadyPickUp] = useState(0);
  const [resListPickedUp, setResListPickedUp] = useState([]);
  const [resTotalPickedUp, setResTotalPickedUp] = useState(0);
  const [resListDelivered, setResListDelivered] = useState([]);
  const [resTotalDelivered, setResTotalDelivered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('air');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getListArrival();
  }, []);

  const changeTab = key => {
    switch (key) {
      case "ARV":
        getListArrival();
        break;
      case "RCP":
        getListReadyToPickUp();
        break;
      case "PBC":
        getListPickedUp();
        break;
      case "DTC":
        getListDelivered();
        break;
      default:
        getListArrival();
    }
  };

  const paramGetList = (filter, keyword) => {
    return `?searchBy=${filter}&keyword=${keyword}`;
  }

  const getListArrival = async () => {
    setLoading(true);
    setResTotalArrival(0);
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/SHP${()=>paramGetList(filter, keyword)}`);
      setLoading(false);
      setResListArrival(response.data.data.invoices);
      setResTotalArrival(response.data.data.total);
    } catch (error) {
      setLoading(false);
      setResListArrival([]);
      setResTotalArrival(0);
    }
  };

  const getListReadyToPickUp = async () => {
    setLoading(true);
    setResTotalReadyPickUp(0);
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/ARV`);
      setLoading(false);
      setResListReadyPickUp(response.data.data.invoices);
      setResTotalReadyPickUp(response.data.data.total);
    } catch (error) {
      setLoading(false);
      setResListReadyPickUp([]);
      setResTotalReadyPickUp(0);
    }
  };

  const getListPickedUp = async () => {
    setLoading(true);
    setResTotalPickedUp(0);
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/RCP`);
      setLoading(false);
      setResListPickedUp(response.data.data.invoices);
      setResTotalPickedUp(response.data.data.total);
    } catch (error) {
      setLoading(false);
      setResListPickedUp([]);
      setResTotalPickedUp(0);
    }
  };

  const getListDelivered = async () => {
    setLoading(true);
    setResTotalDelivered(0);
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.MANAGE_ORDER}/PBC`);
      setLoading(false);
      setResListDelivered(response.data.data.invoices);
      setResTotalDelivered(response.data.data.total);
    } catch (error) {
      setLoading(false);
      setResListDelivered([]);
      setResTotalDelivered(0);
    }
  };

  return (
    <Tabs defaultActiveKey="1" type="itable-card" onChange={changeTab}>
      <TabPane tab={strings.tab_indo_arrival} key="ARV">
        <ListArrival
          invoices={resListArrival}
          total={resTotalArrival}
          loading={loading}
          onLoad={() => getListArrival()}
        />
      </TabPane>
      <TabPane tab={strings.tab_indo_ready_to_pickup} key="RCP">
        <ListReadyPickUp
          invoices={resListReadyPickUp}
          total={resTotalReadyPickUp}
          loading={loading}
          onLoad={() => getListReadyToPickUp()}
        />
      </TabPane>
      <TabPane tab={strings.tab_indo_pickup_by_courier} key="PBC">
        <ListPickedUp
          invoices={resListPickedUp}
          total={resTotalPickedUp}
          loading={loading}
          onLoad={() => getListPickedUp()}
        />
      </TabPane>
      <TabPane tab={strings.tab_indo_delivered} key="DTC">
        <ListDelivered
          invoices={resListDelivered}
          total={resTotalDelivered}
          loading={loading}
          onLoad={() => getListDelivered()}
        />
      </TabPane>
    </Tabs>
  );
};

export default OrderIndonesia;

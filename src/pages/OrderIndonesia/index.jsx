import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ListArrival from "../../containers/ListArrival";
import ListReadyPickUp from "../../containers/ListReadyPickUp";
import ListPickedUp from "../../containers/ListPickedUp";
import ListDelivered from "../../containers/ListDelivered";
import strings from "../../localization";
import { apiGetWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import HeaderOrder from "../../components/HeaderOrder";
import NotFoundOrder from "../../components/NotFoundOrder";
import NotFoundSearch from "../../components/NotFoundSearch";

const TabPane = Tabs.TabPane;
const OrderIndonesia = () => {
  const [resListArrival, setResListArrival] = useState([]);
  const [resListReadyPickUp, setResListReadyPickUp] = useState([]);
  const [resListPickedUp, setResListPickedUp] = useState([]);
  const [resListDelivered, setResListDelivered] = useState([]);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [categorySearch, setCategorySearch] = useState("invoice_number");
  const [keyTab, setKeyTab] = useState("ARV");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("air");

  const initTabActive = tab => {
    switch (tab) {
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

  const changeTab = key => {
    setSearching(false);
    setKeyTab(key);
    initTabActive(key);
  };

  useEffect(() => {
    setSearching(false);
    getListArrival();
  }, []);

  const actionFilter = value => {
    setFilter(value);
  };

  const actionCategory = value => {
    setCategorySearch(value);
  };

  const actionSearch = value => {
    setSearching(true);
    initTabActive(keyTab);
  };

  const actionChangeQuery = value => {
    setQuery(value);
  };

  const paramGetListInvoice = (categorySearch, query) => {
    return {
      searchBy: categorySearch,
      keyword: query
    }
  };

  const revertState = (query, loading, total) => {
    setQuery(query);
    setLoading(loading);
    setTotalInvoice(total);
  };

  const getListArrival = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(
        `${PATH_ORDER.STATUS}/SHP`,paramGetListInvoice(categorySearch, query)
      );
      revertState("", false, response.data.data.total);
      setResListArrival(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListArrival(null);
    }
  };

  const getListReadyToPickUp = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.STATUS}/RCP`,paramGetListInvoice(categorySearch, query));
      revertState("", false, response.data.data.total);
      setResListReadyPickUp(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListReadyPickUp(null);
    }
  };

  const getListPickedUp = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.STATUS}/PBC`,paramGetListInvoice(categorySearch, query));
      revertState("", false, response.data.data.total);
      setResListPickedUp(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListPickedUp(null);
    }
  };

  const getListDelivered = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.STATUS}/DTC`,paramGetListInvoice(categorySearch, query));
      revertState("", false, response.data.data.total);
      setResListDelivered(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListDelivered(null);
    }
  };

  const notFound = searching => {
    return searching ? <NotFoundSearch /> : <NotFoundOrder />;
  };

  const header = () => (
    <HeaderOrder
      onChangeFilter={actionFilter}
      onChangeCategory={actionCategory}
      onSearch={actionSearch}
      total={totalInvoice}
      onChangeQuery={actionChangeQuery}
      valueSearch={query}
    />
  );

  return (
    <Tabs defaultActiveKey="1" type="itable-card" onChange={changeTab}>
      <TabPane tab={strings.tab_indo_arrival} key="ARV">
        {header()}
        <ListArrival
          invoices={resListArrival}
          total={totalInvoice}
          loading={loading}
          onLoad={() => getListArrival()}
        >
          {notFound(searching)}
        </ListArrival>
      </TabPane>
      <TabPane tab={strings.tab_indo_ready_to_pickup} key="RCP">
        {header()}
        <ListReadyPickUp
          invoices={resListReadyPickUp}
          total={totalInvoice}
          loading={loading}
          onLoad={() => getListReadyToPickUp()}
        >
          {notFound(searching)}
        </ListReadyPickUp>
      </TabPane>
      <TabPane tab={strings.tab_indo_pickup_by_courier} key="PBC">
        {header()}
        <ListPickedUp
          invoices={resListPickedUp}
          total={totalInvoice}
          loading={loading}
          onLoad={() => getListPickedUp()}
        >
          {notFound(searching)}
        </ListPickedUp>
      </TabPane>
      <TabPane tab={strings.tab_indo_delivered} key="DTC">
        {header()}
        <ListDelivered
          invoices={resListDelivered}
          total={totalInvoice}
          loading={loading}
          onLoad={() => getListDelivered()}
        >
          {notFound(searching)}
        </ListDelivered>
      </TabPane>
    </Tabs>
  );
};

export default OrderIndonesia;

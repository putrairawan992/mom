import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ListNeedResponse from "../../containers/ListNeedResponse";
import ListPurchased from "../../containers/ListPurchased";
import ListReadyToShip from "../../containers/ListReadyToShip";
import ListNeedPurchased from "../../containers/ListNeedPurchase";
import ListShipped from "../../containers/ListShipped";
import { apiGetWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import HeaderOrder from "../../components/HeaderOrder";

const TabPane = Tabs.TabPane;
const OrderChina = () => {
  const [resListNeedResponse, setResListNeedResponse] = useState([]);
  const [resListNeedPurchase, setResListNeedPurchase] = useState([]);
  const [resListPurchased, setResListPurchased] = useState([]);
  const [resListReadyToShip, setResListReadyToShip] = useState([]);
  const [resListShipped, setResListShipped] = useState([]);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("sea");
  const [query, setQuery] = useState("");
  const [categorySearch, setCategorySearch] = useState("invoice_number");
  const [keyTab, setKeyTab] = useState("NRP");

  const initTabActive = (tab) => {
    //document.getElementById("text-search").value = "";
    switch (tab) {
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
        getListReadyToShip();
        break;
      case "SHP":
        getListShipped();
        break;
      default:
        getListNeedResponse();
    }
  }

  const changeTab = key => {
    setKeyTab(key);
    initTabActive(key)
  };

  useEffect(() => {
    getListNeedResponse();
  }, []);

  // useEffect(() => {
  //   query !== "" &&
  //   initTabActive(keyTab);
  // }, [query]);

  const actionFilter = value => {
    setFilter(value);
  };

  const actionCategory = value => {
    setCategorySearch(value);
  }

  const actionSearch = (value) => {
    initTabActive(keyTab);
  };

  const actionChangeQuery = value => {
    setQuery(value);
  }

  const paramGetListInvoice = (categorySearch, query) => {
    return `?searchBy=${categorySearch}&keyword=${query}`;
  };

  const revertState = (query, loading, total) => {
    setQuery(query);
    setLoading(loading);
    setTotalInvoice(total);
  }

  const getListNeedResponse = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(
        `${PATH_ORDER.MANAGE_ORDER}/status/NRP${paramGetListInvoice(categorySearch, query)}`
      );
      revertState("", false, response.data.data.total);
      setResListNeedResponse(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListNeedResponse([]);
    }
  };

  const getListNeedPurchase = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(
        `${PATH_ORDER.MANAGE_ORDER}/status/NPR${paramGetListInvoice(categorySearch, query)}`
      );
      revertState("", false, response.data.data.total);
      setResListNeedPurchase(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListNeedPurchase([]);
    }
  };

  const getListPurchased = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(
        `${PATH_ORDER.MANAGE_ORDER}/status/PRC${paramGetListInvoice(categorySearch, query)}`
      );
      revertState("", false, response.data.data.total);
      setResListPurchased(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListPurchased([]);
    }
  };

  const getListReadyToShip = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(
        `${PATH_ORDER.MANAGE_ORDER}/status/RTS${paramGetListInvoice(categorySearch, query)}`
      );
      revertState("", false, response.data.data.total);
      setResListReadyToShip(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListReadyToShip([]);
    }
  };

  const getListShipped = async () => {
    setLoading(true);
    setTotalInvoice(0);
    try {
      const response = await apiGetWithToken(
        `${PATH_ORDER.MANAGE_ORDER}/status/SHP${paramGetListInvoice(categorySearch, query)}`
      );
      revertState("", false, response.data.data.total);
      setResListShipped(response.data.data.invoices);
    } catch (error) {
      revertState("", false, 0);
      setResListShipped([]);
    }
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
    <React.Fragment>
      <Tabs defaultActiveKey="NRP" type="itable-card" onChange={changeTab}>
        <TabPane tab="Need Response" key="NRP">
          {header()}
          <ListNeedResponse
            invoices={resListNeedResponse}
            total={totalInvoice}
            loading={loading}
            onLoad={() => getListNeedResponse()}
          />
        </TabPane>
        <TabPane tab="Need Purchase" key="NPR">
          {header()}
          <ListNeedPurchased
            invoices={resListNeedPurchase}
            total={totalInvoice}
            loading={loading}
            onLoad={() => getListNeedPurchase()}
          />
        </TabPane>
        <TabPane tab="Purchased" key="PRC">
          {header()}
          <ListPurchased
            invoices={resListPurchased}
            total={totalInvoice}
            loading={loading}
            onLoad={() => getListPurchased()}
          />
        </TabPane>
        <TabPane tab="Ready To Ship" key="RTS">
          {header()}
          <ListReadyToShip
            invoices={resListReadyToShip}
            total={totalInvoice}
            loading={loading}
            onLoad={() => getListReadyToShip()}
          />
        </TabPane>
        <TabPane tab="Shipped" key="SHP">
          {header()}
          <ListShipped
            invoices={resListShipped}
            total={totalInvoice}
            loading={loading}
            onLoad={() => getListShipped()}
          />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default OrderChina;

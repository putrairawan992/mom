import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import ModalSupplier from "../../containers/ModalSupplier";
import ModalAddNote from "../../components/ModalAddNote";
import { needPurchased } from "../../dataSource/need_purchased";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalReason from "../../containers/ModalReason";
import ModalHistory from "../ModalHistory";

import "../../sass/style.sass";
import "./style.sass";

const ListNeedPurchased = () => {
  const [orders, setOrders] = useState([]);
  const [visibleSupplier, setVisibleSupplier] = useState(false);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);

  useEffect(() => {
    const data = needPurchased.data;
    setOrders(data);
  }, []);

  const actionSearch = payload => {
    console.log(payload);
  };

  const actionFilter = payload => {
    console.log(payload);
  };

  const contentNotification = (message, description, icon, colorIcon) => {
    notification.open({
      message: message,
      description: description,
      icon: <Icon type={icon} theme="filled" style={{ color: colorIcon }} />,
      style: {
        width: 500,
        marginLeft: 400 - 508
      }
    });
  };

  const handlePurchased = invoiceId => {
    console.log(invoiceId);
    contentNotification(
      "New Order has moved to the next process.",
      "Continue responding the order you have selected in Need Purchased Tabs.",
      "check-circle",
      "#52C41A"
    );
  };

  const handleSupplierInfo = invoiceId => {
    setVisibleSupplier(true);
  };

  const actionOk = () => {
    setVisibleSupplier(!visibleSupplier);
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = payload => {
    console.log(payload);
    console.log(payload.note.length);
    actionUndo();
    contentNotification(
      "Order Undo.",
      "The Order is being undo, you can see the history in activity log",
      "info-circle",
      "#1890FF"
    );
  };

  const actionCancel = () => {
    setVisibleCancel(!visibleCancel);
  };

  const actionSubmitCancel = payload => {
    actionCancel();
    contentNotification(
      "Order Canceled.",
      "The Order is being canceled, you can see the history in activity log or canceled order tab",
      "info-circle",
      "#1890FF"
    );
  };

  const actionAddNotes = () => {
    setVisibleAddNote(!visibleAddNote);
  };

  const actionSubmitAddNote = payload => {
    actionAddNotes();
    contentNotification(
      "A note has been added.",
      "You can see the history in activity notes",
      "info-circle",
      "#1890FF"
    );
  };

  const actionShowLog = () => {
    setVisibleLog(!visibleLog);
  };

  const actionShowNote = () => {
    setVisibleNote(!visibleNote);
  };

  const optionsCancel = [
    { value: "C01", name: "Out of Stock" },
    { value: "C02", name: "Product Discontinued" },
    { value: "C03", name: "Others" }
  ];

  const optionsUndo = [
    { value: "101", name: "Wrong Press" },
    { value: "102", name: "Others" }
  ];

  return (
    <React.Fragment>
      <HeaderOrder
        onChangeFilter={actionFilter}
        onSearch={actionSearch}
        totalRecord={80}
      />
      {orders.map(order => (
        <Card key={order.invoiceId}>
          {order.indexes.map(index => (
            <Row key={index.id}>
              <Col md={2}>
                <img
                  src={index.productImage}
                  alt=""
                  className="img-order-product"
                />
              </Col>
              <Col md={22}>
                <Row>
                  <Col md={12}>
                    <TextInvoiceNumber invoiceNumber={order.invoiceNumber} />
                    <TextProductName
                      productTextChina={index.productNameChina}
                      productTextIndonesia={index.productName}
                    />
                    <table border={0}>
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: 20 }}>
                            <span>Respond Time </span>
                          </td>
                          <td>:</td>
                          <td>
                            <span>28-02-2019 13:20</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Customer Note </span>
                          </td>
                          <td>:</td>
                          <td>
                            <span>{index.note}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col md={12}>
                    <div className="wrap-button">
                      <Button
                        type="secondary"
                        onClick={() => handleSupplierInfo(order.invoiceId)}
                      >
                        Supplier Info
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => handlePurchased(order.invoiceId)}
                      >
                        Purchased
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Col md={12}>
                    <div className="wrap-variant">
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/vacation-landmarks/512/45-512.png"
                        alt=""
                        className="image-shipping"
                      />
                      <OrderVariant
                        variants={index.variants}
                        quantity={index.productQuantity}
                        price={index.price}
                        withPrice={true}
                      />
                    </div>
                  </Col>
                  <Col offset={3} md={9}>
                    <div className="wrap-button-text-icon">
                      <ButtonTextIcon
                        icon="rollback"
                        label="Undo"
                        onClick={actionUndo}
                      />
                      <ButtonTextIcon
                        icon="close-circle"
                        label="Cancel Order"
                        onClick={actionCancel}
                      />
                      <ButtonTextIcon
                        icon="message"
                        label="Add Admin Notes"
                        onClick={actionAddNotes}
                      />
                    </div>
                    <div className="wrap-button-text-icon">
                      <ButtonTextIcon
                        icon="file-exclamation"
                        label="Show Logs"
                        onClick={actionShowLog}
                      />
                      <ButtonTextIcon
                        icon="file-text"
                        label="Show Admin Notes"
                        onClick={actionShowNote}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
          <ModalSupplier
            order={order}
            visible={visibleSupplier}
            onOk={actionOk}
          />
          <ModalReason
            visible={visibleUndo}
            onSubmit={actionSubmitUndo}
            onCancel={actionUndo}
            invoiceId={order.invoiceId}
            options={optionsUndo}
            title={"Are you going back / undo to previous process?"}
            buttonTitle={"Undo"}
            max={255}
          />
          <ModalReason
            options={optionsCancel}
            visible={visibleCancel}
            onCancel={actionCancel}
            onSubmit={actionSubmitCancel}
            invoiceId={order.invoiceId}
            title={"Cancel Order"}
            buttonTitle={"Cancel Order"}
            max={255}
          />
          <ModalAddNote
            visible={visibleAddNote}
            onSubmit={actionSubmitAddNote}
            onCancel={actionAddNotes}
            invoiceId={order.invoiceId}
          />
          <ModalHistory
            title="Activity Logs"
            list={order.activityLogs}
            visible={visibleLog}
            onOk={actionShowLog}
            onCancel={actionShowLog}
          />
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListNeedPurchased;

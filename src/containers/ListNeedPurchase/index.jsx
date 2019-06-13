import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import OrderDetail from "../../components/OrderDetail";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import ModalSupplier from "../../components/ModalSupplier";
import ModalUndo from "../../components/ModalUndo";
import ModalCancel from "../../components/ModalCancel";
import ModalAddNote from "../../components/ModalAddNote";
import { needPurchased } from "../../dataSource/need_purchased";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";

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
    console.log(payload);
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
    console.log(payload);
  };

  const actionShowLog = () => {
    setVisibleLog(!visibleLog);
  };

  const actionShowNote = () => {
    setVisibleNote(!visibleNote);
  };

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
                    <OrderDetail
                      invoiceNumber={order.invoiceNumber}
                      index={index}
                    />
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
                        label="Cancle Order"
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
          <ModalUndo
            visible={visibleUndo}
            onSubmit={actionSubmitUndo}
            onCancel={actionUndo}
            invoiceId={order.invoiceId}
          />
          <ModalCancel
            visible={visibleCancel}
            onSubmit={actionSubmitCancel}
            onCancel={actionCancel}
            invoiceId={order.invoiceId}
          />
          <ModalAddNote
            visible={visibleAddNote}
            onSubmit={actionSubmitAddNote}
            onCancel={actionAddNotes}
            invoiceId={order.invoiceId}
          />
          <ModalLogs visible={visibleLog} onOk={actionShowLog} logs={[]} />
          <ModalNote visible={visibleNote} onOk={actionShowNote} logs={[]} />
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListNeedPurchased;

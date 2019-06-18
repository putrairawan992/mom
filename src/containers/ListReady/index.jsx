import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import "../../sass/style.sass";
import OrderDetail from "../../components/OrderDetail";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import OrderAction from "../../components/OrderAction";
import ModalSupplier from "../../components/ModalSupplier";
import ModalUndo from "../../components/ModalUndo";
import ModalCancel from "../../components/ModalCancel";
import ModalAddNote from "../../components/ModalAddNote";
import { needPurchased } from "../../dataSource/need_purchased";
import OrderNote from "../../components/OrderNote";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";
import Button from "../../components/Button"
import ModalReason from "../../containers/ModalReason"

const ListReady = () => {
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

  const actionSearch = (payload) => {
    console.log(payload);
    
  }

  const actionFilter = (payload) => {
    console.log(payload);
    
  }

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

  const actionShowNotes = () => {
    setVisibleNote(!visibleNote);
  };

  const actionShowNote = () => {
    setVisibleNote(!visibleNote);
  };

  const optionsCancel = [
    { value: "C01", name: "Out of Stock" },
    { value: "C02", name: "Product Discontinued" },
    { value: "C03", name: "Others" }
  ]

  const optionsUndo = [
    { value: "101", name: "Wrong Press" },
    { value: "102", name: "Others" }
  ]

  return (
    <React.Fragment>
      <HeaderOrder onChangeFilter = {actionFilter} onSearch = {actionSearch} totalRecord={80}/>
      {orders.map(order => (
        <Card key={order.invoiceId}>
          <Row type="flex" justify="space-between">
            <Col span={11}>
              <OrderDetail order={order} />
            </Col>
            <Col>
                <Button
                  // className="button-secondary"
                  type="secondary"
                  onClick={() => handleSupplierInfo(order.invoiceId)}
                >
                  Print Label
                </Button>
                <ModalSupplier
                  order={order}
                  visible={visibleSupplier}
                  onOk={actionOk}
                />
                <Button
                  type="primary"
                  style={{marginLeft: "10px"}}
                  // className="button-primary"
                  onClick={() => handlePurchased(order.invoiceId)}
                >
                  Shipped
                </Button>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={11}>
            <Row>
                <Col span={5} />
                <Col>
                  <Row>
                    <Col span={5}>
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/vacation-landmarks/512/45-512.png"
                        alt=""
                        className="image-shipping"
                      />
                    </Col>
                    <Col>
                      {order.indexes.map(index => (
                        <OrderVariant
                          key={index.id}
                          variants={index.variants}
                          quantity={index.productQuantity}
                          price={index.price}
                        />
                      ))}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <OrderAction
                onClickUndo={() => actionUndo()}
                onClickCancel={() => actionCancel()}
                onClickAddNotes={() => actionAddNotes()}
              />
              <OrderNote
                onClickLog={() => actionShowLog()}
                onClickNotes={() => actionShowNotes()}
              />
              {/* <ModalUndo
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
              /> */}
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
              <ModalLogs visible={visibleLog} onOk={actionShowLog} logs={[]} />
              <ModalNote
                visible={visibleNote}
                onOk={actionShowNote}
                logs={[]}
              />
            </Col>
          </Row>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListReady;

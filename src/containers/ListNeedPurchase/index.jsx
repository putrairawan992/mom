import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, notification, Icon } from "antd";
import "../../sass/style.sass";
import OrderDetail from "../../components/OrderDetail";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import OrderAction from "../../components/OrderAction";
import ModalSupplier from "../../components/ModalSupplier";
import ModalUndo from "../../components/ModalUndo";
import ModalCancle from "../../components/ModalCancle";
import ModalAddNote from "../../components/ModalAddNote";
import { needPurchased } from "../../dataSource/need_purchased";
import OrderNote from "../../components/OrderNote";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";

const ListNeedPurchased = () => {
  const [orders, setOrders] = useState([]);
  const [visibleSupplier, setVisibleSupplier] = useState(false);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleCancle, setVisibleCancle] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);

  useEffect(() => {
    const data = needPurchased.data;
    setOrders(data);
  }, []);

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

  const actionCancle = () => {
    setVisibleCancle(!visibleCancle);
  };

  const actionSubmitCancle = payload => {
    console.log(payload);
    actionCancle();
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

  return (
    <React.Fragment>
      <HeaderOrder />
      {orders.map(order => (
        <Card key={order.invoiceId}>
          <Row type="flex" justify="space-between">
            <Col span={11}>
              <OrderDetail order={order} />
            </Col>
            <Col>
              <Button
                className="button-secondary"
                onClick={() => handleSupplierInfo(order.invoiceId)}
              >
                Supplier Info
              </Button>
              <ModalSupplier
                order={order}
                visible={visibleSupplier}
                onOk={actionOk}
              />
              <Button
                type="primary"
                className="button-primary"
                onClick={() => handlePurchased(order.invoiceId)}
              >
                Purchased
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
                onClickCancle={() => actionCancle()}
                onClickAddNotes={() => actionAddNotes()}
              />
              <OrderNote
                onClickLog={() => actionShowLog()}
                onClickNotes={() => actionShowNotes()}
              />
              <ModalUndo
                visible={visibleUndo}
                onSubmit={actionSubmitUndo}
                onCancle={actionUndo}
                invoiceId={order.invoiceId}
              />
              <ModalCancle
                visible={visibleCancle}
                onSubmit={actionSubmitCancle}
                onCancle={actionCancle}
                invoiceId={order.invoiceId}
              />
              <ModalAddNote
                visible={visibleAddNote}
                onSubmit={actionSubmitAddNote}
                onCancle={actionAddNotes}
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

export default ListNeedPurchased;

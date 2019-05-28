import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Button, notification, Icon } from "antd";
import "../../sass/style.sass";
import OrderDetail from "../../components/OrderDetail";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import OrderUndoNotesAction from "../../components/OrderUndoNotesAction";
import ModalUndo from "../../components/ModalUndo";
import ModalAddNote from "../../components/ModalAddNote";
import { needPurchased } from "../../dataSource/need_purchased";
import OrderNote from "../../components/OrderNote";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";
import ReactToPrint from "react-to-print";
import LabelChina from "../../components/LabelChina";

const ListReady = () => {
  const [orders, setOrders] = useState([]);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);

  const componentRef = useRef();

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

  return (
    <React.Fragment>
      <HeaderOrder
        onChangeFilter={actionFilter}
        onSearch={actionSearch}
        totalRecord={80}
      />
      {orders.map(order => (
        <Card key={order.invoiceId}>
          <Row type="flex" justify="space-between">
            <Col span={11}>
              <OrderDetail order={order} />
            </Col>
            <Col>
              <ReactToPrint
                trigger={() => (
                  <Button className="button-secondary">Print Label</Button>
                )}
                content={() => componentRef.current}
                closeAfterPrint={true}
              />
              <div style={{ display: "none" }}>
                <LabelChina ref={componentRef} />
              </div>
              <Button
                type="primary"
                className="button-primary"
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
              <OrderUndoNotesAction
                onClickUndo={() => actionUndo()}
                onClickAddNotes={() => actionAddNotes()}
              />
              <OrderNote
                onClickLog={() => actionShowLog()}
                onClickNotes={() => actionShowNotes()}
              />
              <ModalUndo
                visible={visibleUndo}
                onSubmit={actionSubmitUndo}
                onCancel={actionUndo}
                invoiceId={order.invoiceId}
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

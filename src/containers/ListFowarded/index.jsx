import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, notification, Icon, Steps } from "antd";
import "../../sass/style.sass";
import OrderDetail from "../../components/OrderDetail";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import ModalSupplier from "../../components/ModalSupplier";
import ModalUndo from "../../components/ModalUndo";
import { needPurchased } from "../../dataSource/need_purchased";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";
import OrderUndo from "../../components/OrderUndoAction";
import OrderNote from "../../components/OrderNote";

const ListFowarded = () => {
  const [orders, setOrders] = useState([]);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);

  const { Step } = Steps;

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
              <Row>
                <Col>
                  <Steps progressDot current={1}>
                    <Step description="" />
                  </Steps>
                </Col>
                <Col>
                  <span>It's way to Indonesia</span>
                </Col>
              </Row>
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
              <OrderUndo onClickUndo={() => actionUndo()} />
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

export default ListFowarded;

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, notification, Icon, Steps } from "antd";
import "../../sass/style.sass";
import OrderDetail from "../../components/OrderDetail";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import ModalUndo from "../../components/ModalUndo";
import { needPurchased } from "../../dataSource/need_purchased";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";
import ButtonTextIcon from "../../components/ButtonTextIcon";

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
                    <span>TEst</span>
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
          <ModalUndo
            visible={visibleUndo}
            onSubmit={actionSubmitUndo}
            onCancel={actionUndo}
            invoiceId={order.invoiceId}
          />
          <ModalLogs visible={visibleLog} onOk={actionShowLog} logs={[]} />
          <ModalNote visible={visibleNote} onOk={actionShowNote} logs={[]} />
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListFowarded;

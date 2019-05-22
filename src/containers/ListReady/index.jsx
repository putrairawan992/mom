import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, message } from "antd";
import "../../sass/style.sass";
import OrderDetail from "../../components/OrderDetail";
import { dataNeedResponse } from "../../dataSource/need_response";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import OrderAction from "../../components/OrderAction";
import ModalSupplier from "../../components/ModalSupplier";
import ModalUndo from "../../components/ModalUndo";
import ModalCancle from "../../components/ModalCancle";
import ModalAddNote from "../../components/ModalAddNote";

const ListReady = () => {
  const [orders, setOrders] = useState([]);
  const [visibleSupplier, setVisibleSupplier] = useState(false);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleCancle, setVisibleCancle] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  useEffect(() => {
    const data = dataNeedResponse.data;
    setOrders(data);
  }, []);

  const handlePurchased = invoiceId => {
    console.log(invoiceId);

    message.success("New Order has moved to the next process");
  };

  const handleSupplierInfo = invoiceId => {
    console.log(invoiceId);
    setVisibleSupplier(true);
  };

  const actionOk = () => {
    setVisibleSupplier(!visibleSupplier);
  }

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = invoiceId => {
    console.log(invoiceId);
  };

  const actionCancle = () => {
    setVisibleCancle(!visibleCancle);
  };

  const actionSubmitCancle = invoiceId => {
    console.log(invoiceId);
  };

  const actionAddNote = () => {
    setVisibleAddNote(!visibleAddNote);
  };

  const actionSubmitAddNote = invoiceId => {
    console.log(invoiceId);
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
              <ModalSupplier order={order} visible={visibleSupplier} onOk={actionOk}/>
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
              {order.indexes.map(index => (
                <OrderVariant
                  span={5}
                  key={index.id}
                  variants={index.variants}
                  quantity={index.productQuantity}
                />
              ))}
            </Col>
            <Col span={10}>
              <OrderAction
                undo={() => actionUndo()}
                cancle={() => actionCancle()}
                addNote={() => actionAddNote()}
              />
              <ModalUndo visible={visibleUndo} onUndo={actionSubmitUndo} onCancle={actionUndo} invoiceId = {order.invoiceId}/>
              <ModalCancle visible={visibleCancle} onUndo={actionSubmitCancle} onCancle={actionCancle} invoiceId = {order.invoiceId}/>
              <ModalAddNote visible={visibleAddNote} onUndo={actionSubmitAddNote} onCancle={actionAddNote} invoiceId = {order.invoiceId} />
            </Col>
          </Row>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListReady;

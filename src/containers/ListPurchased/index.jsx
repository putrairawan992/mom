import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, message } from "antd";
import "../../sass/style.sass";
import OrderDetail from "../../components/OrderDetail";
import { dataNeedResponse } from "../../dataSource/need_response";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import OrderAction from "../../components/OrderAction";

const ListPurchased = () => {
  const [orders, setOrders] = useState([]);

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

    message.success("New Order has moved to the next process");
  };

  const actionUndo = invoiceId => {
    console.log(invoiceId);
  };
  const actionCancle = invoiceId => {
    console.log(invoiceId);
  };
  const actionAddNote = invoiceId => {
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
                  key={index.id}
                  variants={index.variants}
                  quantity={index.productQuantity}
                />
              ))}
            </Col>
            <Col span={10}>
              <OrderAction
                undo={() => actionUndo(order.invoiceId)}
                cancle={() => actionCancle(order.invoiceId)}
                addNote={() => actionAddNote(order.invoiceId)}
              />
            </Col>
          </Row>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListPurchased;

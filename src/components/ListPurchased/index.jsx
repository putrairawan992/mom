import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "antd";
import "./style.sass";
import OrderDetail from "../OrderDetail";
import { dataNeedResponse } from "../../dataSource/need_response";
import HeaderOrder from "../../components/HeaderOrder";

const ListPurchased = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = dataNeedResponse.data;
    setOrders(data);
  }, []);

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
              <Button type="primary" className="button-response">
                Response
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListPurchased;

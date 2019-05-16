import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, message } from "antd";
import "./style.sass";
import OrderDetail from "../../components/OrderDetail";
import { dataNeedResponse } from "../../dataSource/need_response";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";

const ListNeedResponse = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = dataNeedResponse.data;
    setOrders(data);
  }, []);

  const handleResponse = (invoiceId) => {
    console.log(invoiceId);
    message.config({
      top: '50%',
      duration: 2,
      maxCount: 3,
    });
    message.success('New Order has moved to the next process');
  }

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
              <Button type="primary" className="button-primary" onClick={()=>handleResponse(order.invoiceId)}>
                Response
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
          </Row>
        </Card>
      ))}
    </React.Fragment>
  );
};

ListNeedResponse.propTypes = {
  data: PropTypes.arrayOf(Object)
};

export default ListNeedResponse;

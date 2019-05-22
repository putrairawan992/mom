import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, notification, Icon } from "antd";
import "./style.sass";
import OrderDetail from "../../components/OrderDetail";
import { dataNeedResponse } from "../../dataSource/need_response";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";

const ListNeedResponse = () => {
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    const data = dataNeedResponse.data;
    setOrders(data);
  }, []);

  const handleResponse = invoiceId => {
    console.log(invoiceId);
    contentNotification(
      "New Order has moved to the next process.",
      "Continue responding the order you have selected in Need Purchased Tabs.",
      "check-circle",
      "#52C41A"
    );
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
                type="primary"
                className="button-primary"
                onClick={() => handleResponse(order.invoiceId)}
              >
                Response
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

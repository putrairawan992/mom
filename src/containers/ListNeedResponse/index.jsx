import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, notification, Icon } from "antd";
import "./style.sass";
import OrderDetail from "../../components/OrderDetail";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import Button from "../../components/Button";

const ListNeedResponse = props => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { data } = { ...props };
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
                    <div className="wrap-button">
                      <Button
                        type="primary"
                        onClick={() => handleResponse(order.invoiceId)}
                      >
                        Response
                      </Button>
                    </div>
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
                </Row>
              </Col>
            </Row>
          ))}
        </Card>
      ))}
    </React.Fragment>
  );
};

ListNeedResponse.propTypes = {
  data: PropTypes.arrayOf(Object)
};

export default ListNeedResponse;

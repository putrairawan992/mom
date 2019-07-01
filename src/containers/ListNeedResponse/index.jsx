import React from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import "./style.sass";
import OrderVariant from "../../components/OrderVariant";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import { apiPatchWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import convertTimesTime from "../../helpers/convertTimestime";
import ImageShipping from "../../components/ImageShipping";
import strings from '../../localization';
import LoaderItem from "../../components/LoaderItem";

const ListNeedResponse = (props) => {
  const getListNeedResponse = async (update=false) => {
    try {
      if(update) {
        await props.onLoad();
        contentNotification(
        "New Order has moved to the next process.",
        "Continue responding the order you have selected in Need Purchased Tabs.",
        "check-circle",
        "#52C41A"
      );
        }
    } catch (error) {
      console.log(error);
    }
  }

  const patchNextNeedResponse = async (invoiceId) => {
    try {
      const response = await apiPatchWithToken(`${PATH_ORDER.NEXT}/${invoiceId}`);
      if(response){
        getListNeedResponse(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    patchNextNeedResponse(invoiceId)
  };

  return (
    <React.Fragment>
      {props.loading && (
        <Card>
          <Row type="flex" justify="center">
            <LoaderItem size={10} loading={props.loading} />
          </Row>
        </Card>
      )}
      {props.invoices && !props.loading ? props.invoices.map(invoice => (
        <Card key={invoice.id}>
          {invoice.items.map(item => (
            <Row key={item.id}>
              <Col md={2}>
                <img
                  src={item.productSnapshot.image}
                  alt=""
                  className="img-order-product"
                />
              </Col>
              <Col md={22}>
                <Row>
                  <Col md={12}>
                    <TextInvoiceNumber invoiceNumber={invoice.number} />
                    <TextProductName
                      productTextChina={item.productSnapshot.nameChina}
                      productTextIndonesia={item.productSnapshot.name}
                    />
                    <table border={0}>
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: 20 }}>
                            <span>{strings.order_time}</span>
                          </td>
                          <td>:</td>
                          <td>
                            <span>{convertTimesTime.millisecond(item.orderDate)}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>{strings.customer_note}</span>
                          </td>
                          <td>:</td>
                          <td>
                            <span>{item.note}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col md={12}>
                    <div className="wrap-button">
                      <Button
                        type="primary"
                        onClick={() => handleResponse(invoice.id)}
                      >
                        {strings.respond}
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Col md={12}>
                    <div className="wrap-variant">
                      <ImageShipping shipping={item.shipping} />
                      <OrderVariant
                        variant={item.productSnapshot.variant}
                        quantity={item.productSnapshot.quantity}
                        price={item.productSnapshot.price}
                        withPrice={true}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Card>
      )):null}
    </React.Fragment>
  );
};

export default ListNeedResponse;

import React, { useState } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import "../../sass/style.sass";
import OrderVariant from "../../components/OrderVariant";
import ModalHistory from "../../containers/ModalHistory";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import strings from "../../localization";
import ModalReason from "../../containers/ModalReason";
import { apiPatchWithToken } from "../../services/api";
import convertTimesTime from "../../helpers/convertTimestime";
import { PATH_ORDER } from "../../services/path/order";
import ImageShipping from "../../components/ImageShipping";
import LoaderItem from "../../components/LoaderItem";

const ListShipped = props => {
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);

  const getListPurchased = async (update = false, action) => {
    try {
      if (update) {
        if (action === "UNDO") {
          await props.onLoad();
          actionUndo();
          contentNotification(
            "Order Undo.",
            "The Order is being undo, you can see the history in activity log",
            "info-circle",
            "#1890FF"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchUndoPurchased = async payload => {
    try {
      const response = await apiPatchWithToken(
        `${PATH_ORDER.UNDO}/${payload.invoiceId}`
      );
      if (response) {
        getListPurchased(true, "UNDO");
      }
    } catch (error) {
      console.log(error);
    }
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
    patchUndoPurchased(payload);
  };

  const actionShowLog = () => {
    setVisibleLog(!visibleLog);
  };

  const actionShowNote = () => {
    setVisibleNote(!visibleNote);
  };

  const optionsUndo = [
    { value: "101", name: "Wrong Press" },
    { value: "102", name: "Others" }
  ];

  return (
    <React.Fragment>
      {props.loading && (
        <Card>
          <Row type="flex" justify="center">
            <LoaderItem size={10} loading={props.loading} />
          </Row>
        </Card>
      )}
      {props.invoices && !props.loading
        ? props.invoices.map(invoice => (
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
                                <span>{strings.shipped_time}</span>
                              </td>
                              <td>:</td>
                              <td>
                                <span>
                                  {convertTimesTime.millisecond(item.orderDate)}
                                </span>
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
                          <span>{strings.its_way_to_indonesia}</span>
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
                      <Col offset={3} md={9}>
                        <div className="wrap-button-text-icon">
                          <ButtonTextIcon
                            icon="rollback"
                            label={strings.undo}
                            onClick={actionUndo}
                          />
                        </div>
                        <div className="wrap-button-text-icon">
                          <ButtonTextIcon
                            icon="file-exclamation"
                            label={strings.show_logs}
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
              <ModalReason
                visible={visibleUndo}
                onSubmit={actionSubmitUndo}
                onCancel={actionUndo}
                invoiceId={invoice.id}
                options={optionsUndo}
                title={strings.modal_undo_title}
                buttonTitle={strings.undo}
              />
              {/* <ModalHistory
            title="Activity Logs"
            list={order.activityLogs}
            visible={visibleLog}
            onOk={actionShowLog}
            onCancel={actionShowLog}
          /> */}
            </Card>
          ))
        : null}
    </React.Fragment>
  );
};

export default ListShipped;

import React, { useState, useRef } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import "../../sass/style.sass";
import OrderVariant from "../../components/OrderVariant";
import ReactToPrint from "react-to-print";
import LabelChina from "../../components/LabelChina";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import ModalConfirm from "../../components/ModalConfirm";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalHistory from "../ModalHistory";
import ModalReason from "../../containers/ModalReason";
import strings from "../../localization";
import { apiPatchWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import ImageShipping from "../../components/ImageShipping";
import convertTimesTime from "../../helpers/convertTimestime";
import LoaderItem from "../../components/LoaderItem";

const ListReadyToShip = props => {
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const componentRef = useRef();

  const actionSearch = payload => {
    console.log(payload);
  };

  const actionFilter = payload => {
    console.log(payload);
  };

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
        } else if (action === "NEXT") {
          await props.onLoad();
          contentNotification(
            "New Order has moved to the next process.",
            "Continue responding the order you have selected in Need Purchased Tabs.",
            "check-circle",
            "#52C41A"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchNextPurchased = async invoiceId => {
    try {
      const response = await apiPatchWithToken(
        `${PATH_ORDER.NEXT}/${invoiceId}`
      );
      if (response) {
        showConfirm();
        setLoadingConfirm(false);
        getListPurchased(true, "NEXT");
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

  const handleReadyToShip = invoiceId => {
    showConfirm();
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = payload => {
    patchUndoPurchased(payload);
  };

  const actionAddNotes = () => {
    setVisibleAddNote(!visibleAddNote);
  };

  const actionSubmitAddNote = payload => {
    actionAddNotes();
    contentNotification(
      "A note has been added.",
      "You can see the history in activity notes",
      "info-circle",
      "#1890FF"
    );
    console.log(payload);
  };

  const actionShowLog = () => {
    setVisibleLog(!visibleLog);
  };

  const actionShowNote = () => {
    setVisibleNote(!visibleNote);
  };

  const showConfirm = () => {
    setVisibleConfirm(!visibleConfirm);
  };

  const actionConfirm = invoiceId => {
    setLoadingConfirm(!loadingConfirm);
    patchNextPurchased(invoiceId);
  };

  const actionCancelConfirm = () => {
    showConfirm();
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
                                <span>{strings.ready_time}</span>
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
                          <ReactToPrint
                            trigger={() => (
                              <Button type="secondary">Print Label</Button>
                            )}
                            content={() => componentRef.current}
                            closeAfterPrint={true}
                          />
                          <div style={{ display: "none" }}>
                            <LabelChina ref={componentRef} />
                          </div>
                          <Button
                            type="primary"
                            onClick={() => handleReadyToShip(invoice.id)}
                          >
                            Ready To Ship
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
                      <Col offset={3} md={9}>
                        <div className="wrap-button-text-icon">
                          <ButtonTextIcon
                            icon="rollback"
                            label="Undo"
                            onClick={actionUndo}
                          />
                          <ButtonTextIcon
                            icon="message"
                            label="Add Admin Notes"
                            onClick={actionAddNotes}
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
              <ModalConfirm
                visible={visibleConfirm}
                value={invoice.id}
                loading={loadingConfirm}
                onOk={actionConfirm}
                onCancel={actionCancelConfirm}
                title={"Makes Sure that the package is ready to be shipped."}
                description={
                  "Please check if the package is neatly wrapped and the label is already patched to the package"
                }
              />
            </Card>
          ))
        : null}
    </React.Fragment>
  );
};

export default ListReadyToShip;

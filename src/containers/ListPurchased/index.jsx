import React, { useState } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import OrderVariant from "../../components/OrderVariant";
import ModalAddNote from "../../components/ModalAddNote";
import ModalConfirm from "../../components/ModalConfirm";
import ModalConfirmPrint from "../../components/ModalConfirmPrint";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalHistory from "../ModalHistory";
import ModalReason from "../../containers/ModalReason";
import { apiPatchWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import ImageShipping from "../../components/ImageShipping";
import convertTimesTime from "../../helpers/convertTimestime";
import strings from '../../localization';

import "../../sass/style.sass";
import LabelChina from "../../components/LabelChina";
import LoaderItem from "../../components/LoaderItem";

const ListPurchased = (props) => {
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [visibleConfirmPrint, setVisibleConfirmPrint] = useState(false);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const getListPurchased = async (update=false, action) => {
    try {
      if(update){
        if(action === "UNDO"){
          await props.onLoad();
          actionUndo();
          contentNotification(
            "Order Undo.",
            "The Order is being undo, you can see the history in activity log",
            "info-circle",
            "#1890FF"
          );
        }else if(action === "CANCEL"){
          await props.onLoad();
          actionCancel();
          contentNotification(
            "Order Canceled.",
            "The Order is being canceled, you can see the history in activity log or canceled order tab",
            "info-circle",
            "#1890FF"
          );
        }
        else if(action === "NEXT"){
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
  }

  const patchNextPurchased = async (invoiceId) => {
    try {
      const response = await apiPatchWithToken(`${PATH_ORDER.NEXT}/${invoiceId}`);
      if(response){
        showConfirm();
        setLoadingConfirm(false);
        actionConfirmPrint();
        getListPurchased(true, "NEXT");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const patchUndoPurchased = async (payload) => {
    try {
      const response = await apiPatchWithToken(`${PATH_ORDER.UNDO}/${payload.invoiceId}`);
      if(response){
        getListPurchased(true, "UNDO");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const patchCanclePurchased = async (payload) => {
    try {
      const response = await apiPatchWithToken(`${PATH_ORDER.CANCEL}/${payload.invoiceId}`);
      if(response){
        getListPurchased(true, "CANCEL");
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  const handlePurchased = invoiceId => {
    showConfirm(invoiceId);
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = payload => {
    patchUndoPurchased(payload);
  };

  const actionCancel = () => {
    setVisibleCancel(!visibleCancel);
  };

  const actionSubmitCancel = payload => {
    patchCanclePurchased(payload);
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

  const actionConfirm = (invoiceId) => {
    setLoadingConfirm(!loadingConfirm);
    patchNextPurchased(invoiceId);
  };

  const actionCancelConfirm = () => {
    showConfirm();
  };

  const actionConfirmPrint = () => {
    setVisibleConfirmPrint(!visibleConfirmPrint);
  };

  const actionCancelPrint = () => {
    setVisibleConfirmPrint(!visibleConfirmPrint);
  };

  const optionsCancel = [
    { value: "C01", name: "Out of Stock" },
    { value: "C02", name: "Product Discontinued" },
    { value: "C03", name: "Others" }
  ];

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
                            <span>{strings.purchased_time}</span>
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
                        onClick={() => handlePurchased(invoice.id)}
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
                        icon="close-circle"
                        label="Cancel Order"
                        onClick={actionCancel}
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
            title={"Are you going back / undo to previous process?"}
            buttonTitle={"Undo"}
          />
          <ModalReason
            options={optionsCancel}
            visible={visibleCancel}
            onCancel={actionCancel}
            onSubmit={actionSubmitCancel}
            invoiceId={invoice.id}
            title={"Cancel Order"}
            buttonTitle={"Cancel Order"}
          />
          <ModalAddNote
            visible={visibleAddNote}
            onSubmit={actionSubmitAddNote}
            onCancel={actionAddNotes}
            invoiceId={invoice.id}
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
          <ModalConfirmPrint
            visible={visibleConfirmPrint}
            loading={false}
            onOk={actionConfirmPrint}
            onCancel={actionCancelPrint}
            title={
              "The order has moved to the next process, you can print the label now or you can print it later."
            }
            description={""}
          >
            <LabelChina />
          </ModalConfirmPrint>
        </Card>
      )):null}
    </React.Fragment>
  );
};

export default ListPurchased;

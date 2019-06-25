import React, { useState } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import ModalSupplier from "../../containers/ModalSupplier";
import ModalAddNote from "../../components/ModalAddNote";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalReason from "../../containers/ModalReason";
import ModalHistory from "../ModalHistory";
import { apiPatchWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import ImageShipping from "../../components/ImageShipping";
import convertTimesTime from "../../helpers/convertTimestime";
import strings from '../../localization';

import "../../sass/style.sass";
import "./style.sass";

const ListNeedPurchased = (props) => {
  const [visibleSupplier, setVisibleSupplier] = useState(false);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);

  const getListNeedPurchase = async (update=false, action) => {
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
        }else if(action === "NEXT"){
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

  const patchNextNeedPurchase = async (invoiceId) => {
    try {
      const response = await apiPatchWithToken(`${PATH_ORDER.NEXT}/${invoiceId}`);
      if(response){
        getListNeedPurchase(true, "NEXT");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const patchUndoNeedPurchase = async (payload) => {
    try {
      const response = await apiPatchWithToken(`${PATH_ORDER.UNDO}/${payload.invoiceId}`);
      if(response){
        getListNeedPurchase(true, "UNDO");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const patchCancleNeedPurchase = async (payload) => {
    try {
      const response = await apiPatchWithToken(`${PATH_ORDER.CANCEL}/${payload.invoiceId}`);
      if(response){
        getListNeedPurchase(true, "CANCEL");
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
    patchNextNeedPurchase(invoiceId);
  };

  const handleSupplierInfo = invoiceId => {
    setVisibleSupplier(true);
  };

  const actionOk = () => {
    setVisibleSupplier(!visibleSupplier);
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = payload => {
    patchUndoNeedPurchase(payload);
  };

  const actionCancel = () => {
    setVisibleCancel(!visibleCancel);
  };

  const actionSubmitCancel = payload => {
    patchCancleNeedPurchase(payload);
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
  };

  const actionShowLog = () => {
    setVisibleLog(!visibleLog);
  };

  const actionShowNote = () => {
    setVisibleNote(!visibleNote);
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
      <HeaderOrder
        onChangeFilter={actionFilter}
        onSearch={actionSearch}
        totalRecord={props.total}
      />
      {props.invoices ? props.invoices.map(invoice => (
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
                            <span>Respond Time </span>
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
                        type="secondary"
                        onClick={() => handleSupplierInfo(invoice.id)}
                      >
                        Supplier Info
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => handlePurchased(invoice.id)}
                      >
                        Purchased
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
                        label={strings.undo}
                        onClick={actionUndo}
                      />
                      <ButtonTextIcon
                        icon="close-circle"
                        label={strings.cancel_order}
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
          <ModalSupplier
            invoice={invoice}
            visible={visibleSupplier}
            onOk={actionOk}
          />
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
        </Card>
      )):null}
    </React.Fragment>
  );
};

export default ListNeedPurchased;

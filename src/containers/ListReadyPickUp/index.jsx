import React, { useState } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import OrderVariant from "../../components/OrderVariant";
import ModalAddNote from "../../components/ModalAddNote";
import ReactToPrint from "react-to-print";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import LoaderItem from "../../components/LoaderItem";
import ModalConfirm from "../../components/ModalConfirm";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalReason from "../../containers/ModalReason";
import ModalHistory from "../ModalHistory";
import {
  apiPatchWithToken,
  apiPostWithToken,
  apiGetWithToken
} from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import strings from "../../localization";
import { optionsUndo } from "../../dataSource/option_undo";
import LabelIndonesia from "../../components/LabelIndonesia";
import OrderDetailIndonesia from "../../components/OrderDetailIndonesia";

import "../../sass/style.sass";
import "./style.sass";

const ListReadyPickUp = props => {
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLogActivities, setVisibleLogActivities] = useState(false);
  const [visibleLogNoteAdmin, setVisibleLogNoteAdmin] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [listLogActivity, setListLogActivity] = useState([]);
  const [listLogNote, setListLogNote] = useState([]);
  const [refInvoice, setRefInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const componentRef = [];

  const updateList = async (update = false, action) => {
    try {
      if (update) {
        if (action === "UNDO") {
          actionUndo();
          await props.onLoad();
          contentNotification(
            "Order Undo.",
            "The Order is being undo, you can see the history in activity log",
            "info-circle",
            "#1890FF"
          );
        } else if (action === "NEXT") {
          await props.onLoad();
        } else {
          actionAddNotes();
          await props.onLoad();
          contentNotification(
            "Admin note created.",
            "Admin note has created, you can see full list by clicking the 'Show Admin Notes' button.",
            "check-circle",
            "#52C41A"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchNext = async invoiceId => {
    setLoading(!loading);
    try {
      const response = await apiPatchWithToken(
        `${PATH_ORDER.NEXT}/${invoiceId}`
      );
      if (response) {
        setLoading(false);
        setVisibleConfirm(!visibleConfirm);
        updateList(true, "NEXT");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postUndo = async value => {
    const request = {
      invoiceId: value.invoiceId,
      subCode: value.reason,
      note: value.note
    };
    try {
      const response = await apiPostWithToken(`${PATH_ORDER.UNDO}`, request);
      if (response) {
        updateList(true, "UNDO");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postNote = async value => {
    const request = {
      id: value.invoiceId,
      note: value.note
    };
    try {
      const response = await apiPostWithToken(`${PATH_ORDER.NOTE}`, request);
      if (response) {
        updateList(true, "NOTE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLogActivity = async value => {
    const invoiceId = value;
    try {
      const response = await apiGetWithToken(
        `${PATH_ORDER.LOG_ACTIVITY}/${invoiceId}`
      );
      if (response) {
        setListLogActivity(response.data.data);
        actionShowLogActivity();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLogNotes = async value => {
    const invoiceId = value;
    try {
      const response = await apiGetWithToken(`${PATH_ORDER.NOTE}/${invoiceId}`);
      if (response) {
        setListLogNote(response.data.data);
        actionShowLogNoteAdmin();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionConfirm = invoiceId => {
    patchNext(invoiceId);
  };

  const actionCancelConfirm = () => {
    setVisibleConfirm(!visibleConfirm);
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

  const handleNextOrder = invoiceId => {
    setRefInvoice(invoiceId);
    setVisibleConfirm(!visibleConfirm);
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = payload => {
    postUndo(payload);
  };

  const actionAddNotes = () => {
    setVisibleAddNote(!visibleAddNote);
  };

  const actionSubmitAddNote = payload => {
    postNote(payload);
  };

  const actionShowLogActivity = () => {
    setVisibleLogActivities(!visibleLogActivities);
  };

  const actionShowLogNoteAdmin = () => {
    setVisibleLogNoteAdmin(!visibleLogNoteAdmin);
  };

  return (
    <React.Fragment>
      {props.loading ? (
        <Card className="card-loading">
          <Row type="flex" justify="center">
            <LoaderItem size={10} loading={props.loading} />
          </Row>
        </Card>
      ) : props.invoices ? (
        props.invoices.map(invoice => (
          <Card key={invoice.id}>
            {invoice.order.orderItems.map(item => (
              <Row key={item.id}>
                <Col md={2}>
                  <img
                    src={item.productSnapshot.image.defaultImage}
                    alt=""
                    className="img-order-product"
                  />
                </Col>
                <Col md={22}>
                  <Row>
                    <Col md={12}>
                      <TextInvoiceNumber
                        invoiceNumber={invoice.invoiceNumber}
                      />
                      <TextProductName
                        productTextChina={item.productSnapshot.nameChina}
                        productTextIndonesia={item.productSnapshot.name}
                      />
                      <OrderDetailIndonesia
                        prevStatus="Shipped Time"
                        supplier={item.supplierSnapshot.name}
                        customer={invoice.order.customer.name}
                        time={invoice.order.orderActivityDate.orderDate}
                      />
                    </Col>
                    <Col md={12}>
                      <div className="wrap-button">
                        <Button
                          type="white"
                          onClick={() => handleNextOrder(invoice.id)}
                        >
                          Picked Up
                        </Button>
                        <ReactToPrint
                          trigger={() => (
                            <Button type="secondary">Print Label</Button>
                          )}
                          content={() => componentRef[invoice.id]}
                          closeAfterPrint={true}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 16 }}>
                    <Col md={12}>
                      <div className="wrap-variant">
                        <OrderVariant
                          variants={item.productSnapshot.informations}
                          quantity={item.productSnapshot.quantity}
                          price={item.productSnapshot.price}
                          withPrice={false}
                        />
                      </div>
                    </Col>
                    <Col offset={3} md={9}>
                      <div className="wrap-button-text-icon">
                        <ButtonTextIcon
                          icon="rollback"
                          label={strings.undo}
                          onClick={() => {
                            setRefInvoice(invoice.id);
                            actionUndo();
                          }}
                        />
                        <ButtonTextIcon
                          icon="message"
                          label="Add Admin Notes"
                          onClick={() => {
                            setRefInvoice(invoice.id);
                            actionAddNotes();
                          }}
                        />
                      </div>
                      <div className="wrap-button-text-icon">
                        <ButtonTextIcon
                          icon="file-exclamation"
                          label={strings.show_logs}
                          onClick={() => {
                            getLogActivity(invoice.id);
                          }}
                        />
                        <ButtonTextIcon
                          icon="file-text"
                          label="Show Admin Notes"
                          onClick={() => {
                            getLogNotes(invoice.id);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
            <div style={{ display: "none" }}>
              <LabelIndonesia
                ref={el => (componentRef[invoice.id] = el)}
                invoice={invoice}
              />
            </div>
          </Card>
        ))
      ) : (
        props.children
      )}

      <ModalConfirm
        visible={visibleConfirm}
        value={refInvoice}
        loading={loading}
        onOk={actionConfirm}
        onCancel={actionCancelConfirm}
        title={"Makes Sure that the package is ready to be shipped."}
        description={
          "Please check if the package is neatly wrapped and the label is already patched to the package."
        }
      />
      <ModalAddNote
        visible={visibleAddNote}
        onSubmit={actionSubmitAddNote}
        onCancel={actionAddNotes}
        invoiceId={refInvoice}
      />
      <ModalReason
        visible={visibleUndo}
        onSubmit={actionSubmitUndo}
        onCancel={actionUndo}
        invoiceId={refInvoice}
        options={optionsUndo}
        title={"Are you going back / undo to previous process?"}
        buttonTitle={"Undo"}
      />
      <ModalHistory
        title="Activity Logs"
        logs={listLogActivity}
        visible={visibleLogActivities}
        onOk={actionShowLogActivity}
        onCancel={actionShowLogActivity}
      />
      <ModalHistory
        title="Admin Notes"
        logs={listLogNote}
        visible={visibleLogNoteAdmin}
        onOk={actionShowLogNoteAdmin}
        onCancel={actionShowLogNoteAdmin}
      />
    </React.Fragment>
  );
};

export default ListReadyPickUp;

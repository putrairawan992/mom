import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import OrderVariant from "../../components/OrderVariant";
import ModalAddNote from "../../containers/ModalAddNote";
import ModalConfirmPrint from "../../containers/ModalConfirmPrint";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import LoaderItem from "../../components/LoaderItem";
import ModalConfirm from "../../containers/ModalConfirm";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalHistory from "../ModalHistory";
import {
  apiPatchWithToken,
  apiPostWithToken,
  apiGetWithToken,
  apiGetWithoutToken
} from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import strings from "../../localization";
import OrderDetailIndonesia from "../../components/OrderDetailIndonesia";
import LabelIndonesia from "../../components/LabelIndonesia";
import contentNotification from "../../helpers/notification";

import { PATH_BARCODE } from "../../services/path/barcode";

const ListArrival = props => {
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLogActivities, setVisibleLogActivities] = useState(false);
  const [visibleLogNoteAdmin, setVisibleLogNoteAdmin] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [visibleConfirmPrint, setVisibleConfirmPrint] = useState(false);
  const [listLogActivity, setListLogActivity] = useState([]);
  const [listLogNote, setListLogNote] = useState([]);
  const [invoiceById, setInvoiceById] = useState(null);
  const [refInvoice, setRefInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [barcodeNumber, setBarcodeNumber] = useState("")

  const updateList = async (update = false, action) => {
    try {
      if (update) {
        if (action === "NEXT") {
          await props.onLoad();
        } else {
          actionAddNotes();
          await props.onLoad();
          contentNotification(
            "Admin note created.",
            "Admin note has created, you can see full list by clicking the 'Show Admin Notes' button.",
            "success"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBarcode = async() => {
    try{
      const response = await apiGetWithoutToken(PATH_BARCODE.BARCODE);
      // console.log("waw", response.data);
      const barcode = response.data.data
      setBarcodeNumber(barcode)
    } catch(error) {
      console.log("error");
    }
  }

  const patchNext = async invoiceId => {
    setLoading(!loading);
    try {
      const response = await apiPatchWithToken(
        `${PATH_ORDER.NEXT}/${invoiceId}`
      );
      if (response) {
        setLoading(false);
        setVisibleConfirm(!visibleConfirm);
        setVisibleConfirmPrint(!visibleConfirmPrint);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postNote = async value => {
    setLoading(!loading);
    const request = {
      invoiceId: value.invoiceId,
      note: value.note
    };
    try {
      const response = await apiPostWithToken(`${PATH_ORDER.NOTE}`, request);
      if (response) {
        updateList(true, "NOTE");
        setLoading(false);
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

  const handleNextOrder = invoiceId => {
    const getInvoice = props.invoices.find(invoice => invoice.id === invoiceId);
    getBarcode();
    setInvoiceById(getInvoice);
    setRefInvoice(invoiceId);
    setVisibleConfirm(!visibleConfirm);
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

  const actionConfirmPrint = () => {
    updateList(true, "NEXT");
    setVisibleConfirmPrint(!visibleConfirmPrint);
  };

  const actionCancelPrint = () => {
    updateList(true, "NEXT");
    setVisibleConfirmPrint(!visibleConfirmPrint);
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
                        time={invoice.order.orderActivityDate.actionDate}
                      />
                    </Col>
                    <Col md={12}>
                      <div className="wrap-button">
                        <Button
                          type="primary"
                          onClick={() => handleNextOrder(invoice.id)}
                        >
                          Create Receipt
                        </Button>
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
        title={"Makes Sure that the package is ready to be delivered."}
        description={
          "Before creating the receipt, please make sure that the product is already checked and being re-packed."
        }
      />
      <ModalAddNote
        visible={visibleAddNote}
        title={"Arrival"}
        onSubmit={actionSubmitAddNote}
        onCancel={actionAddNotes}
        invoiceId={refInvoice}
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
      {invoiceById && (
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
          <LabelIndonesia invoice={invoiceById} barcodeNumber={barcodeNumber} isBarcode={true} />
        </ModalConfirmPrint>
      )}
    </React.Fragment>
  );
};

export default ListArrival;

import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import OrderVariant from "../../components/OrderVariant";
import ModalAddNote from "../../containers/ModalAddNote";
import ModalConfirmPrint from "../../containers/ModalConfirmPrint";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import LoaderItem from "../../components/LoaderItem";
import LabelChina from "../../components/LabelChina";
import ModalConfirm from "../../containers/ModalConfirm";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalReason from "../../containers/ModalReason";
import convertTimesTime from "../../helpers/convertTimestime";
import ModalHistory from "../ModalHistory";
import {
  apiPatchWithToken,
  apiPostWithToken,
  apiGetWithToken
} from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import ImageShipping from "../../components/ImageShipping";
import strings from "../../localization";
import { optionsCancel } from "../../dataSource/option_cancle";
import { optionsUndo } from "../../dataSource/option_undo";
import contentNotification from '../../helpers/notification';

const ListPurchased = props => {
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
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

  const updateList = async (update = false, action) => {
    try {
      if (update) {
        if (action === "UNDO") {
          actionUndo();
          await props.onLoad();
          contentNotification(
            "Order Undo.",
            "The Order is being undo, you can see the history in activity log",
            "info"
          );
        } else if (action === "CANCEL") {
          actionCancel();
          await props.onLoad();
          contentNotification(
            "Order Canceled.",
            "The Order is being canceled, you can see the history in activity log or canceled order tab",
            "info"
          );
        } else if (action === "NEXT") {
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

  const postUndo = async value => {
    const request = {
      invoiceId: value.invoiceId,
      subCode: value.reason,
      note: value.note
    };
    setLoading(!loading);
    try {
      const response = await apiPostWithToken(`${PATH_ORDER.UNDO}`, request);
      if (response) {
        setLoading(false);
        updateList(true, "UNDO");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postCancle = async value => {
    const request = {
      invoiceId: value.invoiceId,
      subCode: value.reason,
      note: value.note
    };
    try {
      const response = await apiPostWithToken(`${PATH_ORDER.CANCEL}`, request);
      if (response) {
        updateList(true, "CANCEL");
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
    setInvoiceById(getInvoice);
    setRefInvoice(invoiceId);
    setVisibleConfirm(!visibleConfirm);
    //setVisibleConfirmPrint(!visibleConfirmPrint);
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = payload => {
    // setLoading(!loading)
    postUndo(payload);
  };

  const actionCancel = () => {
    setVisibleCancel(!visibleCancel);
  };

  const actionSubmitCancel = payload => {
    postCancle(payload);
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
                      <table border={0}>
                        <tbody>
                          <tr>
                            <td style={{ paddingRight: 20 }}>
                              <span>{strings.purchased_time}</span>
                            </td>
                            <td>:</td>
                            <td>
                              <span>
                                {convertTimesTime.TypeMillisecondWithoutSecond(invoice.order.orderActivityDate.actionDate)}
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
                        <Button
                          type="primary"
                          onClick={() => handleNextOrder(invoice.id)}
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
                          variants={item.productSnapshot.informations}
                          quantity={item.productSnapshot.quantity}
                          price={item.productSnapshot.priceCny}
                          withPrice={true}
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
                            setLoading(false);
                            actionUndo();
                          }}
                        />
                        <ButtonTextIcon
                          icon="close-circle"
                          label={strings.cancel_order}
                          onClick={() => {
                            setRefInvoice(invoice.id);
                            actionCancel();
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
        title={"Purchased"}
        loading={loading}
        onSubmit={actionSubmitAddNote}
        onCancel={actionAddNotes}
        invoiceId={refInvoice}
      />
      <ModalReason
        visible={visibleUndo}
        onSubmit={actionSubmitUndo}
        onCancel={actionUndo}
        loading={loading}
        invoiceId={refInvoice}
        options={optionsUndo}
        title={strings.modal_undo_title}
        buttonTitle={strings.undo}
        labelReason={strings.reason}
        warningNote={strings.warning_undo_quote}
      />
      <ModalReason
        visible={visibleCancel}
        onSubmit={actionSubmitCancel}
        onCancel={actionCancel}
        invoiceId={refInvoice}
        options={optionsCancel}
        title={strings.modal_cancle_tittle}
        buttonTitle={strings.cancel_order}
        labelReason={strings.cancellation_category}
        warningNote={strings.warning_cancel_quote}
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
          <LabelChina
            noInvoice={invoiceById.invoiceNumber}
            order={invoiceById.order}
          />
        </ModalConfirmPrint>
      )}
    </React.Fragment>
  );
};

export default ListPurchased;

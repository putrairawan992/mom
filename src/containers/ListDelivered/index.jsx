import React, { useState } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import HeaderOrder from "../../components/HeaderOrder";
import ModalAddNote from "../../components/ModalAddNote";
import ModalConfirm from "../../components/ModalConfirm";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import ModalHistory from "../ModalHistory";
import ModalReason from "../../containers/ModalReason";
import { apiPatchWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import LoaderItem from "../../components/LoaderItem";

import "../../sass/style.sass";
import "./style.sass";

const ListDelivered = props => {
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const getListInvoice = async (update = false, action) => {
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
        } else if (action === "ADD_NOTES") {
          actionAddNotes();
          await props.onLoad();
          contentNotification(
            "New Order has moved to the next process.",
            "Continue responding the order you have selected in Need Purchased Tabs.",
            "check-circle",
            "#52C41A"
          );
        } else if (action === "NEXT") {
          await props.onLoad();
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
        getListInvoice(true, "UNDO");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchNextArrival = async invoiceId => {
    try {
      const response = await apiPatchWithToken(
        `${PATH_ORDER.NEXT}/${invoiceId}`
      );
      if (response) {
        showConfirm();
        setLoadingConfirm(false);
        getListInvoice(true, "NEXT");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const showConfirm = () => {
    setVisibleConfirm(!visibleConfirm);
  };

  const actionConfirm = invoiceId => {
    setLoadingConfirm(!loadingConfirm);
    patchNextArrival(invoiceId);
  };

  const actionCancelConfirm = () => {
    showConfirm();
  };

  const handleNextAction = () => {
    showConfirm();
  };

  const actionSubmitUndo = payload => {
    patchUndoPurchased(payload);
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
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
                        <table border={0}>
                          <tbody>
                            <tr>
                              <td style={{ paddingRight: 20 }}>
                                <span>Delivered Time </span>
                              </td>
                              <td>:</td>
                              <td>
                                <span>28-02-2019 13:20</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                      <Col md={12}>
                        <div className="wrap-button">
                          <Button type="white" onClick={() => handleNextAction()}>
                            Picked Up
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                      <Col md={12}>
                        <div className="wrap-variant">
                          <span className="delivered-text">Delivered</span>
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
              <ModalConfirm
                visible={visibleConfirm}
                value={invoice.id}
                loading={loadingConfirm}
                onOk={actionConfirm}
                onCancel={actionCancelConfirm}
                title={"Makes Sure that the package is picked up by courier."}
                description={
                  "This action button only used if the status update of delivery is not working properly"
                }
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
              <ModalAddNote
                visible={visibleAddNote}
                onSubmit={actionSubmitAddNote}
                onCancel={actionAddNotes}
                invoiceId={invoice.id}
              />
              {/* <ModalHistory
            title="Activity Logs"
            list={invoice}
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

export default ListDelivered;
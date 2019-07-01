import React, { useState } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import ModalAddNote from "../../components/ModalAddNote";
import ModalHistory from "../ModalHistory";
import ModalConfirm from "../../components/ModalConfirm";
import ModalConfirmPrint from "../../components/ModalConfirmPrint";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import OrderDetailIndonesia from "../../components/OrderDetailIndonesia";
import { apiPatchWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";

import "../../sass/style.sass";
import LabelIndonesia from "../../components/LabelIndonesia";
import LoaderItem from "../../components/LoaderItem";

const ListArrival = props => {
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [visibleConfirmPrint, setVisibleConfirmPrint] = useState(false);

  const getListInvoice = async (update = false, action) => {
    try {
      if (update) {
        if (action === "ADD_NOTES") {
          await props.onLoad();
          contentNotification(
            "Order Undo.",
            "The Order is being undo, you can see the history in activity log",
            "info-circle",
            "#1890FF"
          );
        } else if (action === "NEXT") {
          await props.onLoad();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchNextInvoice = async invoiceId => {
    try {
      const response = await apiPatchWithToken(
        `${PATH_ORDER.NEXT}/${invoiceId}`
      );
      if (response) {
        showConfirm();
        setLoadingConfirm(false);
        showModalPrint();
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
    patchNextInvoice(invoiceId);
  };

  const actionCancelConfirm = () => {
    showConfirm();
  };

  const showModalPrint = () => {
    setVisibleConfirmPrint(!visibleConfirmPrint);
  };

  const actionConfirmPrint = () => {
    showModalPrint();
  };

  const actionCancelPrint = () => {
    showModalPrint();
  };

  const handleNextAction = () => {
    showConfirm();
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
                        <OrderDetailIndonesia
                          prevStatus="Shipped Time"
                          item={item}
                        />
                      </Col>
                      <Col md={12}>
                        <div className="wrap-button">
                          <Button
                            type="primary"
                            onClick={() => handleNextAction(invoice.id)}
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
                            variant={item.productSnapshot.variant}
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
                title={"Makes Sure that the package is ready to be delivered."}
                description={
                  "Before creating the receipt, please make sure that the product is already checked and being re-packed"
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
                <LabelIndonesia />
              </ModalConfirmPrint>
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

export default ListArrival;

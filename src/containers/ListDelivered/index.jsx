import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import HeaderOrder from "../../components/HeaderOrder";
import ModalAddNote from "../../components/ModalAddNote";
import ModalUndo from "../../components/ModalUndo";
import { needPurchased } from "../../dataSource/need_purchased";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";
import ModalConfirm from "../../components/ModalConfirm";
import ModalConfirmPrint from "../../components/ModalConfirmPrint";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";

import "../../sass/style.sass";
import "./style.sass";

const ListDelivered = () => {
  const [orders, setOrders] = useState([]);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [visibleConfirmPrint, setVisibleConfirmPrint] = useState(false);

  useEffect(() => {
    const data = needPurchased.data;
    setOrders(data);
  }, []);

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

  const actionConfirm = () => {
    setLoadingConfirm(!loadingConfirm);
    return new Promise((resolve, reject) => {
      setTimeout(2 > 0.5 ? resolve : reject, 2000);
    })
      .then(() => {
        showConfirm();
      })
      .then(() => {
        setLoadingConfirm(false);
        showModalPrint();
      })
      .catch(() => console.log("Oops errors!"));
  };

  const actionCancelConfirm = () => {
    showConfirm();
  };

  const showModalPrint = () => {
    setVisibleConfirmPrint(!visibleConfirmPrint);
  };

  const actionConfirmPrint = () => {
    showModalPrint();
    notifCreateReceipt();
  };

  const actionCancelPrint = () => {
    showModalPrint();
    notifCreateReceipt();
  };

  const handleCreateReceipt = invoiceId => {
    console.log(invoiceId);
    showConfirm();
  };

  const notifCreateReceipt = () => {
    contentNotification(
      "New Order has moved to the next process.",
      "Continue responding the order you have selected in Need Purchased Tabs.",
      "check-circle",
      "#52C41A"
    );
  };

  const actionSubmitUndo = payload => {
    console.log(payload);
    actionUndo();
    contentNotification(
      "Order Undo.",
      "The Order is being undo, you can see the history in activity log",
      "info-circle",
      "#1890FF"
    );
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

  return (
    <React.Fragment>
      <HeaderOrder
        onChangeFilter={actionFilter}
        onSearch={actionSearch}
        totalRecord={80}
      />
      {orders.map(order => (
        <Card key={order.invoiceId}>
          {order.indexes.map(index => (
            <Row key={index.id}>
              <Col md={2}>
                <img
                  src={index.productImage}
                  alt=""
                  className="img-order-product"
                />
              </Col>
              <Col md={22}>
                <Row>
                  <Col md={12}>
                    <TextInvoiceNumber invoiceNumber={order.invoiceNumber} />
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
                      <Button
                        type="white"
                        onClick={() => handleCreateReceipt(order.invoiceId)}
                      >
                        See Detail
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
          />
          <ModalUndo
            visible={visibleUndo}
            onSubmit={actionSubmitUndo}
            onCancel={actionUndo}
            invoiceId={order.invoiceId}
          />
          <ModalAddNote
            visible={visibleAddNote}
            onSubmit={actionSubmitAddNote}
            onCancel={actionAddNotes}
            invoiceId={order.invoiceId}
          />
          <ModalLogs visible={visibleLog} onOk={actionShowLog} logs={[]} />
          <ModalNote visible={visibleNote} onOk={actionShowNote} logs={[]} />
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListDelivered;

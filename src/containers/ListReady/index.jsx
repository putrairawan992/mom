import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import "../../sass/style.sass";
import HeaderOrder from "../../components/HeaderOrder";
import OrderVariant from "../../components/OrderVariant";
import ModalUndo from "../../components/ModalUndo";
import ModalAddNote from "../../components/ModalAddNote";
import { needPurchased } from "../../dataSource/need_purchased";
import ModalLogs from "../../components/ModalLogs";
import ModalNote from "../../components/ModalNote";
import ReactToPrint from "react-to-print";
import LabelChina from "../../components/LabelChina";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import ModalConfirm from "../../components/ModalConfirm";
import Button from "../../components/Button";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";

const ListReady = () => {
  const [orders, setOrders] = useState([]);
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleAddNote, setVisibleAddNote] = useState(false);
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const componentRef = useRef();

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

  const handleShipped = invoiceId => {
    console.log(invoiceId);
    contentNotification(
      "New Order has moved to the next process.",
      "Continue responding the order you have selected in Need Purchased Tabs.",
      "check-circle",
      "#52C41A"
    );
  };

  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
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
        handleShipped();
      })
      .catch(() => console.log("Oops errors!"));
  };

  const actionCancelConfirm = () => {
    showConfirm();
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
                    <TextProductName
                      productTextChina={index.productNameChina}
                      productTextIndonesia={index.productName}
                    />
                    <table border={0}>
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: 20 }}>
                            <span>Ready Time </span>
                          </td>
                          <td>:</td>
                          <td>
                            <span>28-02-2019 13:20</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Customer Note </span>
                          </td>
                          <td>:</td>
                          <td>
                            <span>{index.note}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col md={12}>
                    <div className="wrap-button">
                      <ReactToPrint
                        trigger={() => (
                          <Button type="secondary">
                            Print Label
                          </Button>
                        )}
                        content={() => componentRef.current}
                        closeAfterPrint={true}
                      />
                      <div style={{ display: "none" }}>
                        <LabelChina ref={componentRef} />
                      </div>
                      <Button
                        type="primary"
                        onClick={() => showConfirm(order.invoiceId)}
                      >
                        Shipped
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Col md={12}>
                    <div className="wrap-variant">
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/vacation-landmarks/512/45-512.png"
                        alt=""
                        className="image-shipping"
                      />
                      <OrderVariant
                        variants={index.variants}
                        quantity={index.productQuantity}
                        price={index.price}
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
          <ModalConfirm
            visible={visibleConfirm}
            loading={loadingConfirm}
            onOk={actionConfirm}
            onCancel={actionCancelConfirm}
            title={"Makes Sure that the package is ready to be shipped."}
            description={
              "Please check if the package is neatly wrapped and the label is already patched to the package"
            }
          />
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ListReady;

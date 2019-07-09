import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Card, notification, Icon } from "antd";
import OrderVariant from "../../components/OrderVariant";
import ButtonTextIcon from "../../components/ButtonTextIcon";
import Button from "../../components/Button";
import LoaderItem from "../../components/LoaderItem";
import TextInvoiceNumber from "../../components/TextInvoiceNumber";
import TextProductName from "../../components/TextProductName";
import ModalReason from "../../containers/ModalReason";
import ModalHistory from "../ModalHistory";
import {
  apiPostWithToken,
  apiGetWithToken
} from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";
import ImageShipping from "../../components/ImageShipping";
import strings from "../../localization";

import "../../sass/style.sass";
import "./style.sass";

const ListShipped = props => {
  const [visibleUndo, setVisibleUndo] = useState(false);
  const [visibleLogActivities, setVisibleLogActivities] = useState(false);
  const [visibleLogNoteAdmin, setVisibleLogNoteAdmin] = useState(false);
  const [listLogActivity, setListLogActivity] = useState([]);
  const [listLogNote, setListLogNote] = useState([]);
  const [refInvoice, setRefInvoice] = useState(null);

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
        }
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
  const actionUndo = () => {
    setVisibleUndo(!visibleUndo);
  };

  const actionSubmitUndo = payload => {
    postUndo(payload);
  };

  const actionShowLogActivity = () => {
    setVisibleLogActivities(!visibleLogActivities);
  };

  const actionShowLogNoteAdmin = () => {
    setVisibleLogNoteAdmin(!visibleLogNoteAdmin);
  };

  const optionsUndo = [
    { value: "101", name: "Wrong Press" },
    { value: "102", name: "Others" }
  ];

  return (
    <React.Fragment>
      {props.loading && (
        <Card className="card-loading">
          <Row type="flex" justify="center">
            <LoaderItem size={10} loading={props.loading} />
          </Row>
        </Card>
      )}
      {props.invoices && !props.loading
        ? props.invoices.map(invoice => (
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
                                <span>{strings.shipped_time}</span>
                              </td>
                              <td>:</td>
                              <td>
                                <span>
                                  {invoice.order.orderActivityDate.orderDate}
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
                          <span className="dot"></span><span className="status-order-purchased">{strings.its_way_to_indonesia}</span>
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
                            onClick={() => {
                              setRefInvoice(invoice.id);
                              actionUndo();
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
        : props.children}
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

export default ListShipped;
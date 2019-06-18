import React from "react";
import "./style.sass";
import { Modal, Divider, Row, Col } from "antd";
import Button from "../../components/Button";
import PropTypes, { object } from "prop-types";
import convertTimesTime from "../../helpers/convertTimestime";

const ModalHistory = ({ title, list, visible, onOk, onCancel }) => {
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      {list.map((list, index) => (
        <div className="log-status" key={index}>
          <div className="log-status__admin">
            <b>{convertTimesTime.second(list.date)}</b> -{" "}
            <span>{list.admin}</span>
            <Divider type="vertical" />
            <span>{list.tabStatus}</span>
          </div>
          <span className="log-status__admin__note">{list.note}</span>
        </div>
      ))}
      <Row type="flex" justify="end">
        <Col>
          <Button
            // className="log-status__button-OK"
            type="primary"
            onClick={onOk}
          >
            OK
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

ModalHistory.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default ModalHistory;

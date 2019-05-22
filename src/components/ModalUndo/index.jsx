import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Select, Input, Form, Row, Col } from "antd";
import * as yup from "yup";
import "./style.sass";
import { Formik } from "formik";

const Option = Select.Option;
const TextArea = Input.TextArea;

const options = [
  { value: "101", name: "Wrong Press" },
  { value: "102", name: "Others" }
];

const ModalUndo = ({ visible, onSubmit, onCancle, loading, invoiceId }) => {
  const [schema, SetSchema] = useState(
    yup.object().shape({
      reason: yup.string(),
      note: yup.string()
    })
  );

  const updateSchema = optionReason => {
    optionReason === "102"
      ? SetSchema(
          yup.object().shape({
            reason: yup.string(),
            note: yup.string().required("Please write the detail of Undo")
          })
        )
      : SetSchema(
          yup.object().shape({
            reason: yup.string(),
            note: yup.string()
          })
        );
  };

  return (
    <Modal
      visible={visible}
      title={<span className="title-modal-danger">Are you going back / undo to previous process?</span>}
      onOk={onSubmit}
      onCancel={onCancle}
      closable={false}
      footer={null}
    >
      <Formik
        initialValues={{ reason: "101", note: "" }}
        onSubmit={values => {
          onSubmit({ ...values, invoiceId });
        }}
        validationSchema={schema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <span className="label-reason">Reason</span>
                <Select
                  onChange={value => {
                    updateSchema(value);
                    setFieldValue("reason", value);
                  }}
                  name="reason"
                  value={values.reason}
                  className="select-reason-undo"
                  size="large"
                >
                  {options.map((option, index) => {
                    return (
                      <Option key={index} value={option.value}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="row-item-undo">
              <Col>
                <TextArea
                  name="note"
                  placeholder="Write some notes here"
                  autosize={{ minRows: 6, maxRows: 6 }}
                  onChange={handleChange}
                  value={values.note}
                  maxLength={255}
                  className={errors.note && touched.note && "input-error"}
                />
                <span className="max-length-note">
                  {values.note.length} / 255
                </span>
                {errors.note && touched.note && (
                  <span className={"input-feedback"}>{errors.note}</span>
                )}
              </Col>
            </Row>
            <Row
              className={
                errors.note && touched.note ? "row-button-error" : "row-button"
              }
              type="flex"
              justify="end"
            >
              <Col>
                <span className="cancle" onClick={onCancle}>
                  Cancle
                </span>
                <Button
                  htmlType="submit"
                  type="danger"
                  size="large"
                  className="button-undo"
                >
                  Undo
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

ModalUndo.propTypes = {
  visible: PropTypes.bool,
  onSubmitUndo: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  invoiceId: PropTypes.string
};

export default ModalUndo;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Select, Input, Form, Row, Col, Icon } from "antd";
import * as yup from "yup";
import "./style.sass";
import { Formik } from "formik";
import Button from '../Button'

const Option = Select.Option;
const TextArea = Input.TextArea;

const options = [
  { value: "C01", name: "Out of Stock" },
  { value: "C02", name: "Product Discontinued" },
  { value: "C03", name: "Others" }
];

const ModalCancel = ({ visible, onSubmit, onCancel, loading, invoiceId }) => {
  const [schema, SetSchema] = useState(
    yup.object().shape({
      reason: yup.string(),
      note: yup.string()
    })
  );

  const updateSchema = optionReason => {
    optionReason === "C03"
      ? SetSchema(
          yup.object().shape({
            reason: yup.string(),
            note: yup.string().required(<span><Icon type="exclamation-circle" /> Please write the detail of cancelation</span>)
          })
        )
      : SetSchema(
          yup.object().shape({
            reason: yup.string(),
            note: yup.string()
          })
        );
  };

  const initialValues = { reason: "C01", note: "" }

  return (
    <Modal
      visible={visible}
      title={<span className="title-modal-danger">Cancel Order</span>}
      onOk={onSubmit}
      onCancel={onCancel}
      closable={false}
      footer={null}
    >
      <Formik
        initialValues={initialValues}
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
                <span className="label-reason">Cancellation Category</span>
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
                <Button
                  onClick={onCancel}
                  type="link"
                >Cancel</Button>
                <Button
                  htmlType="submit"
                  type="danger"
                >
                Cancel Order
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

ModalCancel.propTypes = {
  visible: PropTypes.bool,
  onSubmitUndo: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  invoiceId: PropTypes.string
};

export default ModalCancel;

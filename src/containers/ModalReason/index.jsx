import React, { useState } from "react";
import propTypes from "prop-types";
import { Formik } from "formik";
import Button from "../../components/Button";
import { Modal as ModalAnt, Row, Col, Form } from "antd";
import * as yup from "yup";
import TextArea from "../../components/TextArea";
import "./style.sass";
import Select from "../../components/Select";
import strings from "../../localization";

const Modal = ({
  visible,
  onSubmit,
  onCancel,
  invoiceId,
  options,
  title,
  buttonTitle
}) => {
  const [schema, SetSchema] = useState(
    yup.object().shape({
      reason: yup.string().required(),
      note: yup.string()
    })
  );
  const [revertStatus, setRevertStatus] = useState(false);

  const updateSchema = optionReason => {
    optionReason === options[options.length - 1].id
      ? SetSchema(
          yup.object().shape({
            reason: yup.string().required(),
            note: yup.string().required(`${strings.detail_cancel_quote}`)
          })
        )
      : SetSchema(
          yup.object().shape({
            reason: yup.string().required(),
            note: yup.string()
          })
        );
  };

  return (
    <ModalAnt
      visible={visible}
      title={<span className="title-modal-danger">{title}</span>}
      onOK={onSubmit}
      onCancel={onCancel}
      closable={false}
      footer={null}
    >
      <Formik
        initialValues={{
          reason: options ? options[0].id : "default",
          note: ""
        }}
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
                <span className="label-reason">
                  {strings.cancellation_category}
                </span>
                <Select
                  name="reason"
                  value={values.reason}
                  onChange={value => {
                    setRevertStatus(false);
                    updateSchema(value);
                    setFieldValue("reason", value);
                  }}
                  size="large"
                  options={options}
                />
              </Col>
            </Row>
            <Row className="row-item-undo">
              <Col>
                <TextArea
                  name="note"
                  placeholder={strings.textarea_quote}
                  autosize={{ minRows: 6, maxRows: 6 }}
                  onChange={handleChange}
                  value={values.note}
                  maxLength={255}
                  type={
                    errors.note && touched.note && revertStatus
                      ? "error"
                      : "default"
                  }
                />
                {errors.note && touched.note && revertStatus && (
                  <span className="title-modal-danger">{errors.note}</span>
                )}
              </Col>
            </Row>
            <Row
              className={
                errors.note && touched.note && revertStatus
                  ? "row-button-error"
                  : "row-button"
              }
              type="flex"
              justify="end"
            >
              <Col>
                <Button onClick={onCancel} type="link">
                  {strings.cancel}
                </Button>
                <Button
                  htmlType="submit"
                  type="danger"
                  onClick={() => {
                    setRevertStatus(true);
                  }}
                >
                  {buttonTitle}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </ModalAnt>
  );
};

Modal.propTypes = {
  options: propTypes.arrayOf(propTypes.object),
  visible: propTypes.bool,
  onCancel: propTypes.func,
  onSubmit: propTypes.func,
  invoiceId: propTypes.string,
  title: propTypes.string,
  buttonTitle: propTypes.string
};

export default Modal;

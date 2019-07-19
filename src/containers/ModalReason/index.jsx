import React, { useState } from "react";
import propTypes from "prop-types";
import { Formik } from "formik";
import Button from "../../components/Button";
import { Modal as ModalAnt, Row, Col, Form, Icon } from "antd";
import * as yup from "yup";
import TextArea from "../../components/TextArea";
import "./style.sass";
import Select from "../../components/Select";
import strings from "../../localization";

const Modal = ({
  visible,
  onSubmit,
  onCancel,
  loading,
  invoiceId,
  options,
  title,
  buttonTitle,
  warningNote,
  labelReason
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
            note: yup.string().required(`${warningNote}`)
          })
        )
      : SetSchema(
          yup.object().shape({
            reason: yup.string().required(),
            note: yup.string()
          })
        );
  };

  const resetForm = values => {
    values.note = "";
    values.reason = options[0].id;
  };

  return (
    <ModalAnt
      visible={visible}
      style={{ top: 20 }}
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
        onSubmit={(values, { resetForm }) => {
          resetForm({ note: "", reason: options[0].id });
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
            {!visible && resetForm(values)}
            <Row>
              <Col>
                <p className="label-reason">{labelReason}</p>
              </Col>
            </Row>
            <Row>
              <Col>
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
                />
                {errors.note && touched.note && revertStatus && (
                  <span className="message-warning">
                    <Icon type="exclamation-circle" />
                    {` ${errors.note}`}
                  </span>
                )}
              </Col>
            </Row>
            <Row type="flex" justify="end">
              <Col>
                <Button
                  onClick={() => {
                    values.note = "";
                    values.reason = options[0].id;
                    onCancel();
                  }}
                  type="link"
                >
                  {strings.cancel}
                </Button>
                <Button
                  htmlType="submit"
                  type="danger"
                  loading={loading}
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
  buttonTitle: propTypes.string,
  warningNote: propTypes.string,
  labelReason: propTypes.string
};

export default Modal;

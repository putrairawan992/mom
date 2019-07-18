import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "antd";
import * as yup from "yup";
import "./style.sass";
import { Formik } from "formik";
import TextArea from "../TextArea";

const schema = yup.object().shape({
  note: yup.string().required("Please write some notes")
});

const resetForm = values => {
  values.note = "";
};

const ModalAddNote = ({ visible, onSubmit, onCancel, loading, invoiceId }) => {
  return (
    <Modal
      visible={visible}
      title={<span className="title-notes">[ Need Purchase] Note</span>}
      onOk={onSubmit}
      onCancel={onCancel}
      footer={null}
    >
      <span className="label-notes">This Note Will be saved into activity log in this order only</span>
      <br />
      <Formik
        initialValues={{ note: "" }}
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
          {!visible && resetForm(values)}
            <Row className="row-item-undo">
              <Col>
                <TextArea
                  name="note"
                  placeholder="Write some notes here"
                  autosize={{ minRows: 6, maxRows: 6 }}
                  onChange={handleChange}
                  value={values.note}
                  maxLength={255}
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
                <span className="cancel" onClick={onCancel}>
                  Cancel
                </span>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="button-primary"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

ModalAddNote.propTypes = {
  visible: PropTypes.bool,
  onUndo: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  invoiceId: PropTypes.string
};

export default ModalAddNote;

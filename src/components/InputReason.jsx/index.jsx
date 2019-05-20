import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Form, Button } from "antd";
import * as yup from "yup";
import { Formik } from "formik";
import "./style.sass";

const Option = Select.Option;
const { TextArea } = Input;

const schema = yup.object().shape({
  reason: yup.string(),
  note: yup.string().required()
});

const InputReason = props => {
  return (
    <div>
      <span>Reason</span>
      <br />
      <Formik
        initialValues={{ reason: "", note: "" }}
        onSubmit={values => {
            console.log(values);
        }}
        validationSchema={schema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              <Select onChange={handleChange} name="reason" value={values.reason}>
                {props.options.map((option, index) => {
                    console.log(option.value);
                  return (<Option key={index} value={option.value}>
                    {option.name}
                  </Option>)
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <TextArea
                name="note"
                placeholder="Write some notes here.."
                autosize={{ minRows: 3, maxRows: 6 }}
                onChange={handleChange}
                values={values.note}
                className={
                    errors.note && touched.note
                      ? "input-error"
                      : ""
                  }
              />
              {errors.note && touched.note && (
                  <div className={"input-feedback"}>{errors.note}</div>
                )}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Undo
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

InputReason.propTypes = {
  options: PropTypes.arrayOf(Object)
};

export default InputReason;

import React from "react";
import { Icon, Input, Button, Form } from "antd";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import "./style.sass";
import { login } from "../../store/actions/authentication";
import { PATH_AUTHENTICATION } from "../../services/path/login";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const Login = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 400, margin: "auto" }}>
        <h1>LOGIN</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={values => {
            props.login(PATH_AUTHENTICATION.LOGIN, values);
            //props.history.push('/');
          }}
          validationSchema={schema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Item>
                <Input
                  name="username"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username
                      ? "input-text input-error"
                      : "input-text"
                  }
                />
                {errors.username && touched.username && (
                  <div className={"input-feedback"}>{errors.username}</div>
                )}
              </Form.Item>
              <Form.Item>
                <Input
                  name="password"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "input-text input-error"
                      : "input-text"
                  }
                />
                {errors.password && touched.password && (
                  <div className={"input-feedback"}>{errors.password}</div>
                )}
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  auth: state.authentication.auth,
  messageError: state.authentication.messageError,
  isError : state.authentication.checkError
})

export default connect(mapStateToProps, {login})(Login);

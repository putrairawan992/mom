import React from "react";
import { Icon, Form } from "antd";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import "./style.sass";
import { login } from "../../store/actions/authentication";
import { PATH_AUTHENTICATION } from "../../services/path/login";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/img/logo_monggopesen/ic_logo_bag_borderteal.png";
import {useRootContext} from "../../hoc/RootContext";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const Login = props => {
  const {isAuthenticated, handleLogin} = useRootContext();
  console.log("isAuthenticated", isAuthenticated);
  return (
    <div className="mp-login-container">
      <div className="mp-login-header-container">
        <span>Report Problem</span>
        <span>Help</span>
      </div>
      <div className="mp-login-content">
        <img src={logo} alt="monggopesen-logo" />
        <span>Admin Login</span>
        <div className="mp-form-login">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={values => {
              props.login(PATH_AUTHENTICATION.LOGIN, values);
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
                <Form.Item validateStatus={errors.username && touched.username}>
                  <Input
                    placeholder="Username"
                    name="username"
                    prefix={
                      <Icon
                        type="user"
                        style={{
                          color: "rgba(0,0,0,.25)",
                          fontSize: "15.64px"
                        }}
                      />
                    }
                    onChange={handleChange}
                    value={values.username}
                    onBlur={handleBlur}
                    // status={
                    //   errors.username && touched.username ? "error" : "default"
                    // }
                    className="mp-login-input-text"
                  />
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
                    status={
                      errors.password && touched.password ? "error" : "default"
                    }
                    className="mp-login-input-text"
                  />
                  
                </Form.Item>
                {((errors.username && touched.username) || (errors.password && touched.password)) && (
                  <center className="mp-login-error-message"><span>Please don't be stupid! </span></center>
                )}
                <div className="mp-login-button-submit">
                  <Button
                    type="primary"
                    size="large"
                    width="full"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                  <Button onClick={()=>handleLogin({token: "candra"})}>Test</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  auth: state.authentication.auth,
  messageError: state.authentication.messageError,
  isError: state.authentication.checkError
});

export default connect(
  mapStateToProps,
  { login }
)(Login);

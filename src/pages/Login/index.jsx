import React, {useEffect} from "react";
import { Icon, Form, Radio } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/img/logo_monggopesen/ic_logo_bag_borderteal.png";
import {useRootContext} from "../../hoc/RootContext";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
});

export default function Login(props) {
  const {isAuthenticated, handleLogin, isSubmitting, history} = useRootContext();

  useEffect(() => {
    if(isAuthenticated){
      history.push('/');
    }  
  })

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
            initialValues={{ email: "", password: "", role: "" }}
            onSubmit={values => {
              handleLogin(values);
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
                <Form.Item validateStatus={errors.email && touched.email}>
                  <Input
                    placeholder="Email"
                    name="email"
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
                    value={values.email}
                    onBlur={handleBlur}
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
                <Radio.Group name="role" onChange={handleChange} value={values.role} defaultValue="china">
                  <Radio value={"china"}>China</Radio>
                  <Radio value={"indonesia"}>Indonesia</Radio>
                </Radio.Group>
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
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
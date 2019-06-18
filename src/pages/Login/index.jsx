import React from "react";
import { Icon, Form  } from "antd";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import "./style.sass";
import { login } from "../../store/actions/authentication";
import { PATH_AUTHENTICATION } from "../../services/path/login";
import Button from "../../components/Button";
import Input from "../../components/Input"
import logo from "../../assets/img/logo_monggopesen/ic_logo_bag_borderteal.png"

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const Login = (props) => {
  return (
    <div className="loginContainer">
      <div style={{ width: 360}}>
        <div className="loginForm">
          <img src={logo} alt=""/><br/>
        </div>
        <br/>
        <div className="loginForm">
          <p className="admin">Admin Login</p>
        </div>
        <br/>
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
                  placeholder="Username"
                  name="username"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)", fontSize: "15.64px" }} />
                  }
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                  status={
                    errors.username && touched.username
                      ? "error"
                      : "default"
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
                  status={
                    errors.password && touched.password
                      ? "error"
                      : "default"
                  }
                />
                {errors.password && touched.password && (
                  <div className={"input-feedback"}>{errors.password}</div>
                )}
              </Form.Item>
              <Button
                type="primary"
                size="large"
                width="full"
                htmlType="submit"
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

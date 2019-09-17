import React, { useState } from "react";
import { Formik } from "formik";
import Variants from "./Variants";
import VariantsContainer from "./VariantsContainer";
import { schema } from "./schema";
import { Form, Button } from "antd";

export default function FormProduct() {
  const [initialValues, setInitialValues] = useState({
    product: "",
    variants: {},
    variantItems: {}
  });

  const handleSubmit = function() {};
  const updateInitialValues = function(values){
    setInitialValues(values);
  }
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {console.log(errors)}
              <Form.Item>
                <VariantsContainer
                  initialValues={initialValues}
                  updateInitialValues={values => {
                    console.log(values);
                    updateInitialValues(values);
                    
                  }}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                >
                  {props => <Variants {...props} />}
                </VariantsContainer>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

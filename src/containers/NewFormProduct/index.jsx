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

  // const handleSubmit = function(value) {
  //   console.log(value);
  // };

  const updateInitialValues = function(values) {
    console.count("init");
    setInitialValues(values);
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        onSubmit={values => {
          //handleSubmit(values);
        }}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {console.log({
                errors: errors
              })}
              <Form.Item>
                <VariantsContainer
                  initialValues={initialValues}
                  updateInitialValues={values => {
                    updateInitialValues(values);
                  }}
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                >
                  {props => <Variants {...props} />}
                </VariantsContainer>
              </Form.Item>
             <Button htmlType="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

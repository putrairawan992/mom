import React, { useState } from "react";
import { Formik } from "formik";
import Variants from "./Variants";
import VariantsContainer from "./VariantsContainer";
import { schema } from "./schema";

export default function FormProduct() {
  const [initialValues, setInitialValues] = useState({
    product: "baju",
    variants: {}
  });

  const handleSubmit = function() {};
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
        {(
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        ) => {
          return (
            <React.Fragment>
              <VariantsContainer
                initialValues={initialValues}
                updateInitialValues={values => {
                  setInitialValues(values);
                }}
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
              >
                {props => <Variants {...props} />}
              </VariantsContainer>
            </React.Fragment>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

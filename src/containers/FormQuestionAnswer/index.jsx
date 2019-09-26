import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col } from 'antd';
import TextArea from "../../components/TextArea"
import { Formik } from 'formik';
import Button from '../../components/Button';
import { schema } from './schema';
import QuestionAnswer from '../../repository/QuestionAnswer';
import convertSchemaToInit from '../../helpers/convertSchemaToInit';

function FormQuestionAnswer(props) {
    const [initialValues, setInitialValues] = useState();
    useEffect(() => {
        props.action === "create" ? questionAnswerQuestionCreate() : questionAnswerQuestionUpdate();
    },[props.questionAnswer])

    function questionAnswerQuestionCreate() {
        const initValue = convertSchemaToInit(schema);
        setInitialValues({ ...initValue });
    }


    function questionAnswerQuestionUpdate() {
        setInitialValues(props.questionAnswer);
    }


    async function handleSubmit(params, resetForm) {
        let response =
            props.action === "create"
                ? await submitCreate(params)
                : await submitUpdate(params)
        if (response.status === 200) {
            props.onSuccess({ ...params });
            resetForm();
        }
    }

    async function submitCreate(params) {
        const response = await QuestionAnswer.create({
            params: params,
            id: props.id
        });
        return response;
    }

    async function submitUpdate(params) {
        const response = await QuestionAnswer.update({
            params: params
        });
        return response;
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => {
                handleSubmit(values, resetForm);
            }}
            validateOnChange={false}
        >
            {({ values, errors, handleChange, handleSubmit }) => (
                <Card bordered={false}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Item
                            label="Question"
                            validateStatus={errors.question && "error"}
                            help={errors.question}
                        >
                            <TextArea
                                placeholder="Write question here...."
                                name="question"
                                onChange={handleChange}
                                value={values.question}
                                maxLength={250}
                                style={{ height: 100 }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Answer"
                            validateStatus={errors.answer && "error"}
                            help={errors.answer}
                        >
                            <TextArea
                                placeholder="Write answer here..."
                                name="answer"
                                onChange={handleChange}
                                value={values.answer}
                                maxLength={250}
                                style={{ height: 100 }}
                            />
                        </Form.Item>
                        <Row type="flex" justify="end">
                            <Col md={4}>
                            <div className="mp-form-question-asnwer-cancel">
                                <Button type="link" onClick={() => props.onCancel()}>
                                Batalkan
                                </Button>
                                </div>
                            </Col>
                            <Col md={4}>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    disabled={props.onLoading}>
                                    Simpan
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            )}
        </Formik>
    );
};

export default FormQuestionAnswer;
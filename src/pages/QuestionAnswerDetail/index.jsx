import React, { useState, useEffect, Fragment } from 'react';
import Button from '../../components/Button';
import { Input, Table, Col, Modal, notification, Row, Divider, Icon, Typography } from 'antd';
import { Link } from "react-router-dom"
import QuestionAnswer from '../../repository/QuestionAnswer';
import FormQuestionAnswer from '../../containers/FormQuestionAnswer';
import ButtonIcon from '../../components/ButtonIcon';
import "./style.sass";
import Product from '../../repository/Product';
import PATH_URL from '../../routers/path';

const { Text } = Typography

const { confirm } = Modal;

export default function QuestionAnswerDetail(props) {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [questionAnswer, setQuestionAnswer] = useState([])
    const [questionAnswers, setQuestionAnswers] = useState({})
    const [visibleCreateQuestionAnswer, setVisibleCreateQuestionAnswer] = useState(false);
    const [visibleEditQuestionAnswer, setvisibleEditQuestionAnswer] = useState(false);
    const [nameProduct, setNameProduct] = useState("")
    const { Search } = Input;
    const columns = [{
        title: 'Question',
        dataIndex: 'questionAndAnswer',
        key: 'questionAndAnswer'
    }];
    const lowercasedFilter = search.toLowerCase()
    const filteredQnA = questionAnswer && questionAnswer.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(lowercasedFilter)
        );
    })
    const id = props.match.params.id

    const openNotificationWithIcon = (typeText) => {
        notification[typeText.type]({
            message: typeText.title,
            description:
                typeText.description
        });
    };

    useEffect(() => {
        getQuestionAnswerDetail()
        getProduct()
    }, [])

    async function getProduct() {
        let product = await Product.get({
            productId: id
        })
        if (product.status === 200) {
            setNameProduct(product.data.data.information.name)
        }
    }

    async function getQuestionAnswerDetail() {
        let questionAnswer = await QuestionAnswer.get({
            id: id
        })
        if (questionAnswer.status === 200) {
            setQuestionAnswer(questionAnswer.data.data)
        } else {
            setQuestionAnswer([])
        }
    }

    function showDeleteConfirm(id) {
        confirm({
            title: 'Are you sure delete this question?',
            content: 'After clicking the delete button the questions will removed from the list',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteQuestionAnswerDetail(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    async function deleteQuestionAnswerDetail(id) {
        let deleteQuestionAnswer = await QuestionAnswer.remove({
            id: id
        })
        let typeText = {
            type: "success",
            description: "Customers can't see questions that have been deleted.",
            title: "The question was deleted"
        }
        if (deleteQuestionAnswer.status === 200) {
            getQuestionAnswerDetail()
            openNotificationWithIcon(typeText)
        }
    }

    function onChangeSearch(e) {
        setSearch(e.target.value)
        setCurrentPage(0)
    };

    function onPageChange(page) {
        setCurrentPage(page)
    };

    function actionShowCreateQuestionAnswer() {
        setVisibleCreateQuestionAnswer(!visibleCreateQuestionAnswer);
    }

    function updateQuestionAnswer(questionAnswer) {
        setVisibleCreateQuestionAnswer(!visibleCreateQuestionAnswer);
        getQuestionAnswerDetail();
    }

    function handleSuccessEdit() {
        let typeText = {
            type: "success",
            description: "Question has been changed and saved",
            title: "The question was edited"
        }
        openNotificationWithIcon(typeText)
        getQuestionAnswerDetail()
        setvisibleEditQuestionAnswer(!visibleEditQuestionAnswer);
    }

    const actionEdit = (questionAnswers) => {
        setQuestionAnswers(questionAnswers);
        setvisibleEditQuestionAnswer(!visibleEditQuestionAnswer);
    };

    function renderQnA(qna, i) {
        return ({
            key: i,
            questionAndAnswer: [
                <Row key={i}>
                    <Col md={24}>
                        <Row>
                            <Col md={2}><Text disabled>Question</Text></Col>
                            <Col md={1}>:</Col>
                            <Col md={21}>
                                <p>
                                    {qna.question}
                                </p>
                            </Col>
                            <Col md={2}><Text disabled>Answer</Text></Col>
                            <Col md={1}>:</Col>
                            <Col md={21}>
                                <p>
                                    {qna.answer}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={19} offset={3}>
                                <span style={{ fontSize: 20 }}>
                                    <Icon type="like"
                                        style={{ padding: "0px 10px 0px 0px" }} />
                                    {qna.like}
                                    <Icon type="dislike"
                                        style={{ padding: "0px 10px 0px 10px" }} />
                                    {qna.dislike}
                                </span>
                            </Col>
                            <Col md={2}>
                                <span className="mp-table-question-answer__button-wrapper">
                                    <ButtonIcon icon="edit" onClick={() => actionEdit(qna)} />
                                    <ButtonIcon icon="delete" onClick={() => showDeleteConfirm(qna.id)} />
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>]
        })
    };

    return (
        <Fragment>
            <Row className="mp-question-answer-detail-heading">
                <Col md={20}>
                    <h2>Question</h2>
                    <p>for "{nameProduct}"</p>
                </Col>
                <Col md={3} offset={1}>
                    <Link to={PATH_URL.QUESTION_ANSWER}>
                        <Button type="link">
                            <span className="mp-question-answer-detail-heading__back">Back</span>
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={16}>
                    <Search
                        value={search}
                        placeholder="Search"
                        onChange={onChangeSearch}
                    />
                </Col>
                <Col md={3} offset={4}>
                    <Button
                        width="full"
                        onClick={actionShowCreateQuestionAnswer}>
                        Add Question +
                    </Button>
                </Col>
            </Row>
            <Row className="mp-question-answer-detail">
                <Col md={24}>
                    <Divider />
                    <Table
                        className="table-qna"
                        showHeader={false}
                        pagination={{
                            defaultPageSize: 5,
                            current: currentPage,
                            onChange: onPageChange,
                            className: 'mp-table-question-answer'
                        }}
                        dataSource={
                            filteredQnA.map((QnA, i) => (renderQnA(QnA, i)))}
                        columns={columns} />
                </Col>
            </Row>
            <Modal
                visible={visibleCreateQuestionAnswer}
                footer={null}
                onCancel={() => setVisibleCreateQuestionAnswer(!visibleCreateQuestionAnswer)}>
                <h4>Add Question</h4>
                <p>for "{nameProduct}"</p>
                <FormQuestionAnswer
                    action={"create"}
                    onCancel={() => setVisibleCreateQuestionAnswer(!visibleCreateQuestionAnswer)}
                    onSuccess={()=>updateQuestionAnswer()}
                    id={props.match.params.id}
                />

            </Modal>
            {questionAnswer &&
                <Modal
                    title="Edit Question"
                    visible={visibleEditQuestionAnswer}
                    footer={null}
                    onCancel={() => setvisibleEditQuestionAnswer(!visibleEditQuestionAnswer)}>
                    <FormQuestionAnswer
                        action={"update"}
                        onCancel={() => setvisibleEditQuestionAnswer(!visibleEditQuestionAnswer)}
                        onSuccess={() => handleSuccessEdit()}
                        questionAnswer={questionAnswers}
                    />
                </Modal>}
        </Fragment>
    );
};
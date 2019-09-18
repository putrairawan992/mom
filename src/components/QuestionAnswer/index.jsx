import React from "react";
import { Row, Col, Icon } from "antd";
import ButtonIcon from "../ButtonIcon";

function renderQnA(props){
    return ({
        key: props.i,
        questionAndAnswer: [
            <Row key={props.i}>
                <Col md={24}>
                    <Row>
                        <Col md={2}>Question</Col>
                        <Col md={1}>:</Col>
                        <Col md={21}>
                            <b style={{ fontWeight: 555 }}>
                                {props.qna.question}
                            </b>
                        </Col>
                        <Col md={2}>Answer</Col>
                        <Col md={1}>:</Col>
                        <Col md={21}>
                            <p style={{ color: "#417505" }}>
                                {props.qna.answer}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={22}>
                            <Icon type="like" />
                            {props.qna.like}
                            <Icon type="dislike" />
                            {props.qna.dislike}
                        </Col>
                        <Col md={2}>
                            <span
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                <ButtonIcon icon="edit" onClick={() => props.actionEdit(props.qna)} />
                                <ButtonIcon icon="delete" onClick={() => props.showDeleteConfirm(props.qna.id)} />
                            </span>
                        </Col>
                    </Row>
                </Col>
            </Row>]
    })
};

export default renderQnA
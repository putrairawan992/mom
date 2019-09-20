import React, { useState } from "react";
import { Form, Input, Row, Col } from "antd";
import {get} from 'lodash';
import UploadImage from '../../components/UploadImage';
import ButtonTextIcon from '../../components/ButtonTextIcon';
import strings from '../../localization'

export default function VariantItems({ item, errors, values, onChange, onRemove }) {
  const variantItem = `variantItems.${item}`;
  const variantItemName = `${variantItem}.name`;
  const variantItemImage = `${variantItem}.image`
  const [imageUrl ,setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [disable, setDisable] = useState(false)
  const [statusFile, setStatusFile] = useState(false)
  const [statusSize, setStatusSize] = useState(false)
  const [dimension, setDimension] = useState(false)


  const successUpload = function (responseImage, key) {
    setLoading(false)
    setLoadingEdit(false)
    setImageUrl(responseImage.mediumUrl)
    onChange(variantItemImage, responseImage)
    setDisable(true)
  }

  const loadingUpload = function () {
    setLoading(true)
  }

  const  setError = function (key) {
    setLoading(false)
    setLoadingEdit(false)
  }

  const remove = function () {
    onChange(variantItemImage, {})
    setImageUrl('')
  }

  const editImage = function () {
    document.getElementsByClassName(variantItemImage)[0].getElementsByTagName("input")[0].click()
  }

  const timeOut = (setState, time) => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, time)
  }

  const errorType = function (type) {
    switch (type) {
      case 'type' : return timeOut(setStatusFile, 4000);
      break;
      case 'size' : return timeOut(setStatusSize, 4000)
      break;
      case 'dimension' : return timeOut(setDimension, 4000)
    }
  }

  return (
    <React.Fragment>
      <Row type="flex" align="middle">
        <Col span={4}>
          <div>
            <UploadImage
              type="no-style"
              name={variantItemImage}
              successUpload={successUpload}
              loadingUpload={loadingUpload}
              setError={setError}
              imageUrl={imageUrl}
              remove={remove}
              editImage={editImage}
              loading={loading}
              loadingEdit={loadingEdit}
              disabled={disable}
              className={variantItemImage}
              errorType={errorType}
            />
          </div>
        </Col>
        <Col span={16}>
          <div>
            <Form.Item
              validateStatus={get(errors, variantItemName) ? "error" : "success"}
              help={get(errors, variantItemName)}
            >
              <Input
                value={get(values, variantItemName)}
                name={variantItemName}
                onChange={e => onChange(variantItemName, e.target.value)}
              />
              
            </Form.Item>
            {
                statusFile ? 
                (<div className="text-error-message">{strings.type_image_error}</div>): null
              }
              {
                statusSize ? 
                <div className="text-error-message">{strings.size_image_error}</div> : null
              }
              {
                dimension ?
                (<div className="text-error-message">{strings.frame_image_error}</div>) : null
              }
          </div>
        </Col>
        <Col span={4} className="variant" style={{padding : "5px"}}  >
          <div>
            <ButtonTextIcon 
              icon="delete"
              onClick={onRemove}
              label=""
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

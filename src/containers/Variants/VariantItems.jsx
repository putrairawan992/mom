import React, { useState } from "react";
import { Form, Row, Col } from "antd";
import Input from '../../components/Input';
import UploadImage from '../../components/UploadImage';
import ButtonTextIcon from '../../components/ButtonTextIcon';
import { getIn } from "formik" ;

export default function VariantItems({
  errors,  
  onChange, 
  onRemove,
  variantItems,
  pathVariant,
  touched
}) {
  const [error, setErrors] = useState({})
  const successUpload = function (responseImage, key) {
  }

  const remove = function (name) {
    onChange(name, {})
  }

  const editImage = function (id) {
    document.getElementsByClassName(`mp-upload-${id}`)[0].getElementsByTagName("input")[0].click()
  }

  const handleError = function (errors) {
    setErrors(errors)
    setTimeout(() => {
      setErrors({})
    },4000)
  }

  return (
    <React.Fragment>
      {
        variantItems.map((variantItem, index) => {
          const name = `${pathVariant}.${index}.name`;
          const image = `${pathVariant}.${index}.image`;
          const error = getIn(errors, name)
          const touch = getIn(touched, name)
          const variantItemValue = variantItem.name;
          const variantImage = variantItem.image.mediumUrl
          return (
            <Row key={index} type="flex" align="middle">
              <Col span={4}>
                <div>
                  <UploadImage
                    type="no-style"
                    name={image}
                    successUpload={successUpload}
                    onChange={(value) => onChange(image,value)}
                    remove={() => remove(image)}
                    editImage={() => editImage(variantItem.id)}
                    className={`mp-upload-${variantItem.id}`}
                    onError={handleError}
                    imageUrl={variantImage}
                  />
                </div>
              </Col>
              <Col span={16}>
                <div>
                  <Form.Item                  
                    validateStatus={ (error && touch) && "error" }
                    help={ (error && touch) && error }
                  >
                    <Input
                      value={variantItemValue}
                      name={name}
                      onChange={e => onChange(name, e.target.value)}
                    />   
                  </Form.Item>
                </div>
              </Col>
              <Col span={4} className="variant" style={{padding : "5px"}}  >
                <div>
                  <ButtonTextIcon 
                    icon="delete"
                    onClick={() => {
                      if(variantItems.length > 1){
                        onRemove(index)
                      }
                    }}
                    label=""
                  />
                </div>
              </Col>
            </Row>
          )
        })
      }
    </React.Fragment>
  );
}

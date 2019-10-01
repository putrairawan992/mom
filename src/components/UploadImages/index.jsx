import React from 'react';
import UploadImage from '../UploadImage';
import propTypes from 'prop-types'
import {Card, Row, Col, Tag} from 'antd';
import {FieldArray} from 'formik';
import strings from '../../localization';

const UploadImages = (props) => {
  return (
    <React.Fragment>
      <Card className="card" title={<div className="card-title">{strings.product_images}</div>} >
        <Row>
          <Col md={7}>
            <Row type="flex">
            <div className="card-content">{strings.images}</div>
              <Tag className="tag">{strings.required}</Tag>
            </Row>
            <div className="card-sub-content">
              {strings.product_images_quote}
            </div>
            <ul style={{margin: 0, padding: 0, listStyleType: "none"}}>
              <li>{strings.max_image_size}</li>
              <li>{strings.min_frame}</li>
              <li>{strings.format_image}</li>
            </ul>
          </Col>
          <Col md={15}>
            <Row type="flex">
              <FieldArray
                name="listImages"
                render={arrayHelpers => (
                  Object.keys(props.arrImage).map(image => {
                    return (
                      <UploadImage
                        successUpload={props.successUpload}
                        key={image}
                        image={image}
                        remove={() => props.remove(image)}
                        imageUrl={props.imageUrl[image]}
                        disable={props.disable[image]}
                        className="upload"
                        editImage={() => props.editImage(image)}
                        onError={props.handleError}
                        changeDefault={props.changeDefault}
                        type={props.arrImage[image].isDefault ? "default" : "non-default" }
                      />
                    )
                  })
                )}
              />
            </Row>
            {
              props.errorMessage ? 
              (<div className="text-error-message">{props.errorMessage.description}</div>): null
            }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  )
}

UploadImages.propTypes = {
  maxImage: propTypes.number,
}

export default UploadImages
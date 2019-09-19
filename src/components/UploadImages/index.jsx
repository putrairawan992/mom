import React from 'react'
import UploadImage from '../UploadImage'
// import propTypes from 'prop-types'
import {Card, Row, Col, Tag} from 'antd';
import {FieldArray} from 'formik';
import strings from '../../localization'

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
                        loadingUpload={props.loadingUpload}
                        setError={props.setError}
                        errorType={props.errorType}
                        key={image}
                        image={image}
                        remove={props.remove}
                        imageUrl={props.imageUrl[image]}
                        loadingEdit={props.loadingEdit[image]}
                        className="upload"
                        editImage={props.editImage}
                        loading={props.loading[image]}
                        disabled={props.disable[image]}
                        changeDefault={props.changeDefault}
                        beforeUpload={props.beforeUpload}
                        type={props.arrImage[image].isDefault ? "default" : "non-default" }
                        // onChange={(info) => props.handleChange(info,image,arrayHelpers)}
                        // customRequest={({onError, onSuccess,file}) => props.uploadImage({onError, onSuccess,file},image)}
                      />
                    )
                  })
                )}
              />
            </Row>
            {
              props.statusFile ? 
              (<div className="text-error-message">{strings.type_image_error}</div>): null
            }
            {
              props.statusSize ? 
              <div className="text-error-message">{strings.size_image_error}</div> : null
            }
            {
              props.errors.listImages && props.touched.listImages ?
              <div className="text-error-message">{props.errors.listImages}</div> : null
            }
            {
              props.dimension ?
              (<div className="text-error-message">{strings.frame_image_error}</div>) : null
            }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  )
}

// UploadImages.propTypes = {
//   maxImage: propTypes.number,
//   getPayloadImage: propTypes.func
// }

export default UploadImages
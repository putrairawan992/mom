import React from 'react'
import { Upload as UploadAnt, Icon } from 'antd'
import Button from '../Button'
import propTypes from 'prop-types'
import './style.sass'

const UploadImage = props => {
  const uploadButton = (
    <div>
      <Icon type={props.loading ? 'loading' : 'plus'}></Icon>
    </div>
  )
  
  const imageUpload = (
    <div className="containerUpload">
      {
        props.type === 'no-style' ? 
        <>
          <img src={props.imageUrl}  alt="avatar"/> 
          <div className="top-icon">
          <Icon type="camera" onClick={() => props.editImage(props.indexVariant,props.index)}  className="cameraIcon"/>
          <Icon  type="delete" onClick={() => props.remove(props.index,props.imageUrl)} className="deleteIcon"/>
          </div>
          {
            props.loadingEdit ?
            <div className="container-loading">
              <Icon className="loading-edit" type={ 'loading' }></Icon>
            </div>   : null
          }
        </>
        :
        <>
          <img src={props.imageUrl}  alt="avatar"/>
          <div className="top-icon">
          <Icon type="camera" onClick={() => props.editImage(props.index)} className="cameraIcon"/>
          <Icon onClick={() => props.remove(props.image)} type="delete" className="deleteIcon"/>
          </div>
          {
            props.loadingEdit ?
            <div className="container-loading">
              <Icon className="loading-edit" type={ 'loading' }></Icon>
            </div>   : null
          }
          <Button width="full"
            onClick={() => props.changeDefault(props.image)} 
            className={props.type === 'default' ? 'mp-btn-upload' : 'mp-btn-upload-non-default'}
            >
            {props.type === 'default' ? 'Default' : 'Set Default' }
          </Button>
        </>
      }
    </div>
  )

  return(
    <UploadAnt 
      {...props}
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      // className="upload"
      >
      <div className="inside-upload">
      {props.imageUrl ? imageUpload : uploadButton}
      </div>
      
    </UploadAnt>
  )
}

UploadImage.propTypes = {
  customeRequest: propTypes.func,
  action :propTypes.string,
  changeDefault: propTypes.func,
  remove: propTypes.func,
  type: propTypes.oneOf(['default', 'non-default','no-style']),
  disabled: propTypes.bool,
  imageUrl: propTypes.string,
  onChange: propTypes.func
}

export default UploadImage
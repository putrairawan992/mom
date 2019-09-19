import React from 'react'
import { Upload as UploadAnt, Icon } from 'antd'
import Button from '../Button'
import propTypes from 'prop-types'
import ImageRepo from "../../repository/Image"
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
          <Icon type="camera" onClick={() => props.editImage(props.image)} className="cameraIcon"/>
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

  const checkDimension = (file) => {
    return new Promise((resolve, reject) => {
      let _URL = window.URL || window.webkitURL;
      var image = new Image();
      image.src = _URL.createObjectURL(file)
      image.onload = function( ) {
        let width = image.naturalWidth
        let height = image.naturalHeight
        if(width > 450  && height > 450 ){
          resolve(true)
        }else{
          reject(false)
        }
      };
    })
  }

  const uploadRepository = function (formData) {
    return ImageRepo.upload({params: formData})
  }

  const handleChange = function (info) {
    if(info.file.status === 'uploading'){
      props.loadingUpload(props.image)
    }
    if(info.file.status ===  'done' ) {
      let responseImage = info.file.response
      props.successUpload(responseImage, props.image)
    }

  }

  const beforeUpload = (file) => {
    const isPng = file.type === 'image/png'
    const isJpeg = file.type === 'image/jpeg'
    const isJPG = file.type === 'image/jpg';
    const isLt2M = file.size <= 3145728;
    if( !isJPG && !isJpeg && !isPng ) {
      props.errorType('type')
      return false
    }
    if(!isLt2M){
      props.errorType('size')
      return false
    }      
  }

  const uploadImage = function ({onError, onSuccess,file}) {
    let formData = new FormData();
    formData.append("file", file)
    return checkDimension (file)
      .then(() => uploadRepository(formData))
      .then(response => onSuccess(response.data.data))
      .catch(error => {
        onError(error)
        props.setError(props.image)
        props.errorType('dimension')
      })
  }

  return(
    <UploadAnt 
      {...props}
      name="avatar"
      onChange={(info) => handleChange(info)}
      customRequest={({onError, onSuccess,file}) => uploadImage({onError, onSuccess,file})}
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
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
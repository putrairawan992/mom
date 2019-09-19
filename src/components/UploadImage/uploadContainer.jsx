import React from 'react'
import propTypes from 'prop-types'
import ImageRepo from "../../repository/Image"

export default function UploadContainer (props) {
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

  return props.children({
    uploadImage, beforeUpload , handleChange 
  })
}
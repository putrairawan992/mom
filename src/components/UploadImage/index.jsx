import React, {useState, useEffect} from 'react'
import { Upload as UploadAnt, Icon } from 'antd'
import Button from '../Button'
import propTypes from 'prop-types'
import ImageRepo from "../../repository/Image"
import './style.sass'

const UploadImage = props => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [disable, setDisable] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  
  useEffect(() => {
    setDisable(props.disable)
  },[props.disable])

  useEffect (() => {
    setImageUrl(props.imageUrl)
  },[props.imageUrl])

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'}></Icon>
    </div>
  )

  const imageUpload = (
    <div className="containerUpload">
      {
        props.type === 'no-style' ? 
        <>
          <img src={props.imageUrl}  alt="avatar"/> 
          <div className="top-icon">
          <Icon type="camera" onClick={props.editImage}  className="cameraIcon"/>
          <Icon  type="delete" onClick={() => {
            props.remove(props.index,props.imageUrl)
            setImageUrl('')
            setDisable(false)
          }} className="deleteIcon"/>
          </div>
          {
            loadingEdit ?
            <div className="container-loading">
              <Icon className="loading-edit" type={ 'loading' }></Icon>
            </div>   : null
          }
        </>
        :
        <>
          <img src={imageUrl}  alt="avatar"/>
          <div className="top-icon">
          <Icon type="camera" onClick={props.editImage} className="cameraIcon"/>
          <Icon onClick={() => {
            props.remove()
            setImageUrl('')
            setDisable(false)
          }} type="delete" className="deleteIcon"/>
          </div>
          {
            loadingEdit ?
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
      image.onload = () => {
        let width = image.naturalWidth
        let height = image.naturalHeight
        if(width > 450  && height > 450 ){
          resolve(true)
        }else{
          reject({
            name : 'dimension' , description : 'min frame 450 X 450'
          })
        }
      }
    })
  }

  const handleChange = function (info) {
    if(info.file.status === 'uploading'){
      setLoading(true)
      setLoadingEdit(true)
      return 
    }
    if(info.file.status ===  'done' ) {
      setDisable(true)
      setLoading(false)
      setLoadingEdit(false)
      getBase64(info.file.originFileObj, image => {
        let responseImage = info.file.response
        setImageUrl(image)
        props.onChange(responseImage)
        props.successUpload(responseImage, props.image)
      })
    }
  }

  const getBase64 = function (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file) => {
    const isPng = file.type === 'image/png'
    const isJpeg = file.type === 'image/jpeg'
    const isJPG = file.type === 'image/jpg';
    const isLt2M = file.size <= 3145728;
    if( !isJPG && !isJpeg && !isPng ) {
      props.onError({name : 'type' , description : 'Only JPG, JPEG and PNG' })
      return false
    }
    if(!isLt2M){
      props.onError({name : 'size' , description : 'Max Size 3 Mb' })
      return false
    } 
  }
  
  const uploadImage = async function ({onError, onSuccess,file}) {
    let formData = new FormData();
    setLoading(true)
    formData.append("file", file)
    return checkDimension (file)
      .then(() => {
        return ImageRepo.upload({params : formData})
      })
      .then(response => {
        onSuccess(response.data.data)
      })
      .catch(error => {
        props.onError(error)
        onError(error)
        setLoading(false)
        setLoadingEdit(false)
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
      disabled={disable}
    >
      <div className="inside-upload">
      {imageUrl ? imageUpload : uploadButton}
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
  disable: propTypes.bool,
  imageUrl: propTypes.string,
  onChange: propTypes.func,
  onError : propTypes.func,
  successUpload: propTypes.func
} 

UploadImage.defaultProps = {
  onChange : () => {},
  onError : () => {},
  successUpload : () => {}
}

export default UploadImage
import React,{useState, useEffect, useContext} from 'react'
import UploadImage from '../UploadImage'
import { apiPostWithToken } from '../../services/api'
import {PATH_UPLOAD} from '../../services/path/upload'
import propTypes from 'prop-types'
import {Card, Row, Col, Tag} from 'antd';
import {FieldArray} from 'formik';
import strings from '../../localization'
import {getBase64, checkDimension} from '../../helpers/validation-upload';
import ProductContext from '../../context/GlobalStateProduct/product-context';

const UploadImages = (props) => {
  const context = useContext(ProductContext)
  const {initialValues} =  context
  const [imageUrl, setImageUrl] = useState([])
  const [loading, setLoading] = useState([])
  const [disable, setDisable] = useState([])
  const [arrImage, setArrImage] = useState([])
  const [count, setCount] = useState(0)
  const [statusFile, setStatusFile] = useState(false)
  const [statusSize, setStatusSize] = useState(false)
  const [dimension, setDimension] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState([])
  const [countLoading, setCountLoading] = useState(0)

  useEffect(() => {
    setCountLoading(countLoading )
  },[countLoading])
  
  useEffect(() => {
    const initImage = () => {
      const {maxImage} = props
      let obj = {}
      let arr = []
      for(let i = 0; i< maxImage; i++){
        obj.largeUrl = ''
        obj.mediumUrl = ''
        obj.smallUrl = ''
        obj.isDefault = false
        obj.count = 0
        arr.push(obj)
      }
      if(initialValues.listImages){
        const injectArrImage = arr.map((image,index) => {
          if(initialValues.listImages[index]){
            return { ...image, 
                largeUrl : initialValues.listImages[index].largeUrl,
                mediumUrl : initialValues.listImages[index].mediumUrl,
                smallUrl: initialValues.listImages[index].smallUrl,
                isDefault: initialValues.listImages[index].isDefault
            }
          }else{
            return {...image}
          }
        })
        setArrImage(injectArrImage)
      }
    }
    initImage()
  },[])

  useEffect(() => {
    if(initialValues.listImages){
      const dataImages = initialValues.listImages
      let tempImage = [...imageUrl]
      let tempDisable = [...disable]
      const getMediumImage = dataImages.map((image, index) => {
        tempDisable[index] = true
        return [...tempImage,image.mediumUrl]
      })
      setDisable(tempDisable)
      setImageUrl(getMediumImage)
    }
  },[])

  useEffect(() => {
    props.getPayloadImage(arrImage)
  },[arrImage,disable])

 

  const beforeUpload = (file) => {
    const isPng = file.type === 'image/png'
    const isJpeg = file.type === 'image/jpeg'
    const isJPG = file.type === 'image/jpg';
    const isLt2M = file.size <= 3145728;
    if( !isJPG && !isJpeg && !isPng ) {
      timeOut(setStatusFile, 5000)
      return false
    }
    if(!isLt2M){
      timeOut(setStatusSize, 5000)
      return false
    }      
  }

  const timeOut = (setState, time) => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, time)
  }

  const changeDefault = (index) => {
    setArrImage(()=>(
      arrImage.map((image, idx)=>{
        if(idx === index){
          return {...image, isDefault: true}
        }else{
          return {...image, isDefault: false}
        }
      })
    ))
  }

  const pushImageToArray = (response,index,arrayHelpers) => {
    arrayHelpers.push({largeUrl: response.largeUrl, mediumUrl: response.mediumUrl, smallUrl: response.smallUrl})
    setArrImage(()=>(
      arrImage.map((image, idx)=>{
        if(idx === index){
          if(count === 0){
            return {...image, largeUrl: response.largeUrl, mediumUrl: response.mediumUrl, smallUrl: response.smallUrl, isDefault: true}
          }else{
            return {...image, largeUrl: response.largeUrl, mediumUrl: response.mediumUrl, smallUrl: response.smallUrl}
          }
        }else{
          return {...image}
        }
      })
    ));
    setCount(count + 1)
  }

  const removeImageInArray = (index) => {
    setCount(count -1)
    setArrImage(()=>(
      arrImage.map((image, idx)=>{
        if(idx === index){
            return {...image, largeUrl: "", mediumUrl: "", smallUrl: ""}
        }else{
          return {...image}
        }
      })
    ))
  }

  const handleChange = (info,index,arrayHelpers) => {
    let loadingTemp = [...loading]
    if (info.file.status === 'uploading') {
      loadingTemp[index] = true
      setLoading(loadingTemp)
      return;
    }
    if (info.file.status === 'done' ) {
        let imageUrlTemp = [...imageUrl]
        let disableTemp = [...disable]
        getBase64(info.file.originFileObj, function() {
          imageUrlTemp[index]=info.file.response.mediumUrl;
          loadingTemp[index] = false;
          disableTemp[index] = true;
          setImageUrl(imageUrlTemp);
          setLoading(loadingTemp);
          setDisable(disableTemp);
          pushImageToArray(info.file.response,index,arrayHelpers);
        });
    }
  };

  const uploadImage = async ({onError, onSuccess,file},index) => {
    let tempLoadingEdit = [...loadingEdit]
    tempLoadingEdit[index] = true
    setLoadingEdit(tempLoadingEdit)
    try {
      var formData = new FormData();
      formData.append("file",file);
      const isDimension = await checkDimension(file)
      if(isDimension.width > 450 && isDimension.height > 450){
        const response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,formData);
        onSuccess(response.data.data)
        tempLoadingEdit[index] = false
        setLoadingEdit(tempLoadingEdit)
        if(countLoading > 90) {
          setCountLoading(100)
        }
      }else{
        tempLoadingEdit[index] = false
        setLoadingEdit(tempLoadingEdit)
        timeOut(setDimension, 5000)
        let loadingTemp = [...loading]
        loadingTemp[index] = false
        setLoading(loadingTemp)
        
      }
    } catch (error) {
      onError(error)
      let loadingTemp = [...loading]
      loadingTemp[index] = false
      setLoading(loadingTemp)
      console.log(error.response)
    }
  }

  const remove = (index,arrayHelpers) => {
    let tempImageUrl = [...imageUrl]
    if(!arrImage[index].isDefault){
      arrayHelpers.remove(0)
      tempImageUrl[index] = ''
      setImageUrl(tempImageUrl)
      let statusDisable = [...disable]
      statusDisable[index] = false
      setDisable(statusDisable)
      removeImageInArray(index)
    }
    
  }

  const editImage = (index) => {
    document.getElementsByClassName("upload")[index].getElementsByTagName("input")[0].click()
  }
  
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
                  arrImage.map((image,index) => {
                    return (
                      <UploadImage
                        imageUrl={imageUrl[index]}
                        className="upload"
                        onBlur={props.handleBlur}
                        name={"images"}
                        key={index}
                        onChange={(info) => handleChange(info,index,arrayHelpers)}
                        type={image.isDefault ? "default": "non-default"}
                        loading={loading[index]}
                        disabled={disable[index]}
                        remove={() => remove(index,arrayHelpers)}
                        customRequest={({onError, onSuccess,file}) => uploadImage({onError, onSuccess,file},index)}
                        changeDefault={changeDefault}
                        index={index}
                        beforeUpload={beforeUpload}
                        editImage={editImage}
                        loadingEdit={loadingEdit[index]}
                    />
                    )
                  })
                )}
              />
            </Row>
            {
              statusFile ? 
              (<div className="text-error-message">{strings.type_image_error}</div>): null
            }
            {
              statusSize ? 
              <div className="text-error-message">{strings.size_image_error}</div> : null
            }
            {
              props.errors.listImages && props.touched.listImages ?
              <div className="text-error-message">{props.errors.listImages}</div> : null
            }
            {
              dimension ?
              (<div className="text-error-message">{strings.frame_image_error}</div>) : null
            }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  )
}

UploadImages.propTypes = {
  maxImage: propTypes.number,
  getPayloadImage: propTypes.func
}

export default UploadImages
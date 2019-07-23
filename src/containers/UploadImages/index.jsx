import React,{useState, useEffect} from 'react'
import Upload from '../../components/Upload'
import { apiPostWithToken } from '../../services/api'
import {PATH_UPLOAD} from '../../services/path/upload'
import propTypes from 'prop-types'
import {Card, Row, Col, Tag} from 'antd';
import {FieldArray} from 'formik';

const UploadImages = (props) => {
  const [imageUrl, setImageUrl] = useState([])
  const [loading, setLoading] = useState([])
  const [disable, setDisable] = useState([])
  const [arrImage, setArrImage] = useState([])
  const [count, setCount] = useState(0)
  const [statusFile, setStatusFile] = useState(false)
  const [statusSize, setStatusSize] = useState(false)
  const [dimension, setDimension] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState([])
  
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
      setArrImage(arr)
    }
    initImage()
    console.log("tes")  
  },[])

  

  useEffect(() => {
    props.getPayloadImage(arrImage)
  },[arrImage,disable])

  const checkDimension = (file) => {
    return new Promise(resolve => {
      let _URL = window.URL || window.webkitURL;
      var image = new Image();
      image.src = _URL.createObjectURL(file)
      image.onload = function(e ) {
        let dimension = {}
          dimension.width = image.naturalWidth
          dimension.height = image.naturalHeight
        resolve(dimension)   
      };
    })
  }

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
        getBase64(info.file.originFileObj, function(responseImageUrl) {
          imageUrlTemp[index]=responseImageUrl;
          loadingTemp[index] = false;
          disableTemp[index] = true;
          setImageUrl(imageUrlTemp);
          setLoading(loadingTemp);
          setDisable(disableTemp);
          pushImageToArray(info.file.response,index,arrayHelpers);
        });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

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
    // let tempLoading = [...loadingEdit]
    // tempLoading[index] = true
    // setLoadingEdit(tempLoading)
  }
  
  return (
    <React.Fragment>
      <Card className="card" title={<div className="card-title">Product Images</div>} >
        <Row>
          <Col md={7}>
            <Row type="flex">
            <div className="card-content">Images</div>
              <Tag className="tag">Required</Tag>
            </Row>
            <div className="card-sub-content">
              It required at least one image to create a product, the images should be;
            </div>
            <ul style={{margin: 0, padding: 0, listStyleType: "none"}}>
              <li>- Max Img Size 3 MB</li>
              <li>- Min Frame Size 450px X 450px</li>
              <li>- Format jpg, jpeg, png</li>
            </ul>
          </Col>
          <Col md={15}>
            <Row type="flex">
              <FieldArray
                name="listImages"
                render={arrayHelpers => (
                  arrImage.map((image,index) => {
                    return (
                      <Upload
                        imageUrl={imageUrl[index]}
                       
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
              (<div className="text-error-message">Only JPG, PNG, JPEG</div>): null
            }
            {
              statusSize ? 
              <div className="text-error-message">Max Size 3MB</div> : null
            }
            {
              props.errors.listImages && props.touched.listImages ?
              <div className="text-error-message">{props.errors.listImages}</div> : null
            }
            {
              dimension ?
              (<div className="text-error-message">Min Frame Size 450 X 450</div>) : null
            }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  )
}

Upload.propTypes = {
  maxImage: propTypes.number,
  getPayloadImage: propTypes.func
}

export default UploadImages
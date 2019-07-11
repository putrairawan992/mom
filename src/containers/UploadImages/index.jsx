import React,{useState, useEffect} from 'react'
import Upload from '../../components/Upload'
import { apiPostWithToken } from '../../services/api'
import {PATH_UPLOAD} from '../../services/path/upload'
import propTypes from 'prop-types'
import {Card, Row, Col, Tag} from 'antd';
import {FieldArray} from 'formik'

const UploadImages = (props) => {
  const [imageUrl, setImageUrl] = useState([])
  const [loading, setLoading] = useState([])
  const [disable, setDisable] = useState([])
  const [arrImage, setArrImage] = useState([])
  const [count, setCount] = useState(0)
  const [statusFile, setStatusFile] = useState(false)
  const [statusSize, setStatusSize] = useState(false)
  
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
      setStatusFile(true)
      setTimeout(() => {
        setStatusFile(false)
      },3000)
      return false
    }
    if(!isLt2M){
      setStatusSize(true)
      setTimeout(() => {
        setStatusSize(false)
      },3000)
      return false
    }
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
    arrayHelpers.push({largeUrl: response.large, mediumUrl: response.medium, smallUrl: response.small})
    setArrImage(()=>(
      arrImage.map((image, idx)=>{
        if(idx === index){
          if(count === 0){
            return {...image, largeUrl: response.large, mediumUrl: response.medium, smallUrl: response.small, isDefault: true}
          }else{
            return {...image, largeUrl: response.large, mediumUrl: response.medium, smallUrl: response.small}
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
    try {
      var formData = new FormData();
      formData.append("file",file);
      const response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,formData);
      onSuccess(response.data.data)
      console.log("response",response.data.data)
    } catch (error) {
      onError(error)
      let loadingTemp = [...loading]
      loadingTemp[index] = false
      setLoading(loadingTemp)
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
    console.log("jalan gk ini",index)
    console.log(disable[index])
    let statusDisable = [...disable]
    statusDisable[index] = false
    setDisable(statusDisable)
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
              <li>- Min Frame Size 300px X 300px</li>
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
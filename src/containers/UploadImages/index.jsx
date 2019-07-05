import React,{useState, useEffect} from 'react'
import Upload from '../../components/Upload'
import { apiPostWithToken } from '../../services/api'
import {PATH_UPLOAD} from '../../services/path/upload'
import propTypes from 'prop-types'
import {Card, Row, Col} from 'antd';
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
    initImage()
    
  },[])

  useEffect(() => {
    props.getPayloadImage(arrImage)
  },[arrImage])


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

  const initImage = () => {
    const {maxImage} = props
    let obj = {}
    let arr = []
    for(let i = 0; i< maxImage; i++){
      obj.large = ''
      obj.medium = ''
      obj.small = ''
      obj.isDefault = false
      obj.count = 0
      arr.push(obj)
     
    }
    setArrImage(arr)
  }

  const changeDefault = (index,props) => {
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
    arrayHelpers.push({large: response.large, medium: response.medium, small: response.small})
    setArrImage(()=>(
      arrImage.map((image, idx)=>{
        if(idx === index){
          if(count === 0){
            
            return {...image, large: response.large, medium: response.medium, small: response.small, isDefault: true}
          }else{
            return {...image, large: response.large, medium: response.medium, small: response.small}
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
          return {...image, large: "", medium: "", small: ""}
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
      // arrayHelpers.push(response.data.data)
    } catch (error) {
      console.log(error)
      onError(error)
      let loadingTemp = [...loading]
      loadingTemp[index] = false
      setLoading(loadingTemp)
    }
  }

  const remove = (index,arrayHelpers) => {
    arrayHelpers.remove(0)
    imageUrl[index] = ''
    setImageUrl(imageUrl)
    disable[index] = false
    setDisable(disable)
    removeImageInArray(index)
  }
  


  return (
    <React.Fragment>
      <Card title={<div className="card-title">Product Images</div>} >
        <Row>
          <Col md={7}>
          <div className="card-content">Images</div>
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
                name="images"
                render={arrayHelpers => (
                  arrImage.map((image,index) => {
                    return (
                      <Upload
                      imageUrl={imageUrl[index]}
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
              props.errors.images ?
              <div className="text-error-message">{props.errors.images}</div> : null
            }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  )
}

Upload.propTypes = {
  maxImage: propTypes.number,
}

export default UploadImages
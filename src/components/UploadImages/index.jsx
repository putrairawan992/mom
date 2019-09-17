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
  const [imageUrl, setImageUrl] = useState({})
  const [loading, setLoading] = useState({})
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
      let tempObj = {}

      for(let i = 0; i < maxImage; i++){
        obj.largeUrl = ''
        obj.mediumUrl = ''
        obj.smallUrl = ''
        obj.isDefault = false
        obj.count = 0
        const key = 'image' + i
        tempObj[key] = obj
        arr.push(obj)
      }
      console.log("ini obj", tempObj)
      setArrImage(tempObj)
      // if(initialValues.listImages){
      //   const injectArrImage = arr.map((image,index) => {
      //     if(initialValues.listImages[index]){
      //       return { ...image, 
      //           largeUrl : initialValues.listImages[index].largeUrl,
      //           mediumUrl : initialValues.listImages[index].mediumUrl,
      //           smallUrl: initialValues.listImages[index].smallUrl,
      //           isDefault: initialValues.listImages[index].isDefault
      //       }
      //     }else{
      //       return {...image}
      //     }
      //   })
      //   setArrImage(injectArrImage)
      // }
    }
    initImage()
  },[])

  useEffect(() => {
    // if(initialValues.listImages){
    //   const dataImages = initialValues.listImages
    //   let tempImage = [...imageUrl]
    //   let tempDisable = [...disable]
    //   const getMediumImage = dataImages.map((image, index) => {
    //     tempDisable[index] = true
    //     return [...tempImage,image.mediumUrl]
    //   })
    //   setDisable(tempDisable)
    //   setImageUrl(getMediumImage)
    // }
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

  const changeDefault = (key) => {
    let temp = {...arrImage}
    Object.keys(temp).forEach(img => {
      if(img === key){
        temp = {...temp , [img] : {  ...temp[img] , isDefault : true } }
      }else{
        temp = {...temp , [img] : {  ...temp[img] , isDefault : false } }
      }
    })
    setArrImage(temp)
  }

  function saveImageOnState (file, key) {
    if(count === 0){
      setArrImage({
        ...arrImage , [key] : { 
          largeUrl : file.largeUrl , mediumUrl : file.mediumUrl , smallUrl : file.smallUrl , isDefault : true
        }
      })
    }else{
      setArrImage({
        ...arrImage , [key] : file
      })
    }
    setCount(count + 1)
  }

  console.log("arrimage",arrImage)
  console.log("url",imageUrl)

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

  const handleChange = (info,key,arrayHelpers) => {
    let loadingTemp = {...loading}
    if (info.file.status === 'uploading') {
      loadingTemp[key] = true
      setLoading(loadingTemp)
      return;
    }
    if (info.file.status === 'done' ) {
        let imageUrlTemp = {...imageUrl}
        let disableTemp = [...disable]
        getBase64(info.file.originFileObj, function() {
          imageUrlTemp[key]=info.file.response.mediumUrl;
          loadingTemp[key] = false;
          disableTemp[key] = true;
          setImageUrl(imageUrlTemp);
          setLoading(loadingTemp);
          setDisable(disableTemp);
          saveImageOnState(info.file.response, key)
          // pushImageToArray(info.file.response,index,arrayHelpers);
        });
    }
  };

  const uploadImage = async ({onError, onSuccess,file},index) => {
    // let tempLoadingEdit = [...loadingEdit]
    // tempLoadingEdit[index] = true
    // setLoadingEdit(tempLoadingEdit)
    try {
      var formData = new FormData();
      formData.append("file",file);
      // const isDimension = await checkDimension(file)
      const response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,formData);
      onSuccess(response.data.data)
      // console.log(response)
    } catch (error) {
      console.log(error)
      onError(error)
    }
  }

  const remove = (key) => {
    console.log("==",key)
    // let tempImageUrl = [...imageUrl]
    // if(!arrImage[index].isDefault){
    //   arrayHelpers.remove(0)
    //   tempImageUrl[index] = ''
    //   setImageUrl(tempImageUrl)
    //   let statusDisable = [...disable]
    //   statusDisable[index] = false
    //   setDisable(statusDisable)
    //   removeImageInArray(index)
    // }
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
                  Object.keys(arrImage).map(image => {
                    return (
                      <UploadImage
                        key={image}
                        image={image}
                        remove={remove}
                        imageUrl={imageUrl[image]}
                        className="upload"
                        loading={loading[image]}
                        disabled={disable[image]}
                        changeDefault={changeDefault}
                        type={arrImage[image].isDefault ? "default" : "non-default" }
                        onChange={(info) => handleChange(info,image,arrayHelpers)}
                        customRequest={({onError, onSuccess,file}) => uploadImage({onError, onSuccess,file},image)}
                      />
                      
                    )
                  })
                )}
              />
            </Row>
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
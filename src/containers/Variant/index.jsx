import React,{useState} from 'react'
import {Card, Row, Col} from 'antd'
import Button from '../../components/Button'
import ButtonTextIcon from '../../components/ButtonTextIcon'
import Upload from '../../components/Upload'
import Input from '../../components/Input'
import { apiPostWithToken } from '../../services/api'
import { PATH_UPLOAD } from '../../services/path/upload';
import {FieldArray} from 'formik';

const VariantType = (props) => {
  return (
    <Row type="flex" align="middle" justify="center">
      <Col md={4}>
        Variant Type
      </Col>
      <Col md={16}>
        <Input
          onChange={props.handleChange}
          name={`variants.${props.index}.name`}
          onBlur={props.handleBlur}
          size="large"
        />
      </Col>
      <Col className="variant" md={4}>
        <Button onClick={() => props.cancelVariant(props.setFieldValue,props.index,`variants`)} >Cancel</Button>
      </Col>
    </Row>
  )
}

const Variant = (props) => {
  const [loading, setLoading] = useState([])
  const [value,setValue] = useState([])
  const [status,setStatus] = useState([])
  const [statusFile, setStatusFile] = useState([])
  const [statusSize, setStatusSize] = useState([])
  const [dimension, setDimension] = useState([])

  const beforeUpload = (file,index) =>{
    const isPng = file.type === 'image/png'
    const isJpeg = file.type === 'image/jpeg'
    const isJPG = file.type === 'image/jpg';
    const isLt2M = file.size <= 3145728;
    if( !isJPG && !isJpeg && !isPng ) {
      timeOut(setStatusFile,statusFile, 5000,index)
      return false
    }
    if(!isLt2M){
      timeOut(setStatusSize,statusSize, 5000, index)
      return false
    }
  }

  const timeOut = (setState,state, time,index) => {
    const tempState = [...state]
    tempState[index] = true
    setState(tempState)
    setTimeout(() => {
      const tempState = [...state]
      tempState[index] = false
      setState(tempState)
    }, time)
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info,setFieldValue,key,index) => {
    let tempLoading = [...loading]
    if (info.file.status === 'uploading') {
      tempLoading[index] = true
      setLoading(tempLoading)
      return;
    }
    if (info.file.status === 'done' ) {
        getBase64(info.file.originFileObj, function(responseImageUrl) {
          tempLoading[index] = false
          setLoading(tempLoading);
          let objImage = {}
            objImage.largeUrl = info.file.response.largeUrl
            objImage.mediumUrl = info.file.response.largeUrl
            objImage.smallUrl = info.file.response.largeUrl
            objImage.isDefault = false
          setFieldValue(key,objImage)
          let statusDisable = [...status]
          statusDisable[index] = true
          setStatus(statusDisable)
        });
    }
  };

  const uploadImage = async ({onError, onSuccess,file},index) => {
    try {
      var formData = new FormData();
      formData.append("file",file);
      const isDimension = await checkDimension(file)
      if(isDimension.width > 450 && isDimension.height){
        const response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,formData);
        onSuccess(response.data.data)
      }else{
        timeOut(setDimension,dimension, 5000, index)
        let loadingTemp = [...loading]
        loadingTemp[index] = false
        setLoading(loadingTemp)
      }
      
    } catch (error) {
      onError(error)
      let loadingTemp = [...loading]
      loadingTemp[index] = false
      setLoading(loadingTemp)
    }
  }

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

  const handleChangeValue = (e,index) => {
    const tempValue = [...value]
    tempValue[index] = e.target.value
    setValue(tempValue)
  }

  const editImage = () => {
    console.log('edit')
    
  }

  const remove = (i) => {
    props.setFieldValue(`variants.${props.index}.variantItems.${i}.image`, "")
    let tempDisable = [...status]
    tempDisable[i] = true
    setStatus(tempDisable)
  }



  // console.log("ini error",props)
  return(
    <Card title={<VariantType handleChange={props.handleChange} setFieldValue={props.setFieldValue} handleBlur={props.handleBlur} cancelVariant={props.cancelVariant} index={props.index}/>}>
      <FieldArray
        name="variantItems"
        render={arrayHelpers => (
          <React.Fragment>
            {
               props.variant.variantItems.map((l,i) => {
                return (
                <Row key={i} type="flex" align="middle" justify="center">
                  <Col md={4}>
                    <Upload
                      type="no-style"
                      loading={loading[i]}
                      imageUrl={
                        props.values &&
                        props.values[props.index] &&
                        props.values[props.index].variantItems &&
                        props.values[props.index].variantItems[i] &&
                        props.values[props.index].variantItems[i].image &&
                        typeof props.values[props.index].variantItems[i].image.smallUrl === "string"
                        ? props.values[props.index].variantItems[i].image.smallUrl : ""
                      }
                      disabled={status[i]}
                      name={`variants.${props.index}.variantItems.${i}.image`}
                      customRequest={({onError, onSuccess,file}) => uploadImage({onError, onSuccess,file},i)}
                      onChange={(info) => handleChange(info,props.setFieldValue,`variants.${props.index}.variantItems.${i}.image`,i)}
                      editImage={editImage}
                      remove={remove}
                      index={i}
                      beforeUpload={(file) => beforeUpload(file,i)}
                    />
                      {
                        statusFile[i] ? 
                        (<div className="text-error-message">Only JPG, PNG, JPEG</div>): null
                      }
                      {
                        statusSize[i] ? 
                        <div className="text-error-message">Max Size 3MB</div> : null
                      }
                      {
                        dimension[i] ?
                        (<div className="text-error-message">Min Frame Size 450 X 450</div>) : null
                      }
                  </Col>
                  <Col  md={16} className="col-height">
                    <Input
                      name={`variants.${props.index}.variantItems.${i}.name`}
                      onChange={(e) => {
                        props.setFieldValue(`variants.${props.index}.variantItems.${i}.name`,e.target.value)
                        handleChangeValue(e,i)
                      }}
                      value={
                        props.values &&
                        props.values[props.index] &&
                        props.values[props.index].variantItems &&
                        props.values[props.index].variantItems[i] &&
                        typeof props.values[props.index].variantItems[i].name === 'string'
                        ? props.values[props.index].variantItems[i].name : ""
                      }
                      onBlur={props.handleBlur}
                      size="large"
                      status={
                        props.errors.variants &&
                        props.errors.variants[props.index] &&
                        props.errors.variants[props.index].variantItems &&
                        props.errors.variants[props.index].variantItems[i] &&
                        typeof props.errors.variants[props.index].variantItems[i].name === 'string'
                        ? "error" : "default"
                      }        
                    />
                    {
                      props.errors.variants &&
                      props.errors.variants[props.index] &&
                      props.errors.variants[props.index].variantItems &&
                      props.errors.variants[props.index].variantItems[i] &&
                      typeof props.errors.variants[props.index].variantItems[i].name === 'string'
                      ? 
                      (<div className="text-error-message">{props.errors.variants[props.index].variantItems[i].name}</div>) :
                      null
                    }
                    {
                      typeof props.errors.variants === 'string' && props.touched.variants ?
                      (<div className="text-error-message">{props.errors.variants}</div>) : null
                    }
                  </Col>
                  <Col className="variant" md={4}>
                    <ButtonTextIcon label="" onClick={() => {
                      const totalVariantType = props.variant.variantItems.length
                      if(totalVariantType > 1){
                        props.removeVariantItems(i,props.index,props.values,props.onReset)
                        const tempValue = [...value]
                        tempValue[i] = ""
                        setValue(tempValue)
                        arrayHelpers.remove(i)
                      }
                    }}  style={{fontSize : "60px"}} icon="delete"/>
                  </Col>
                </Row>
                )
              })
            }
          </React.Fragment>
        )}
      />
      <br/><br/>
      <Button width="full"  onClick={() => props.addVariantItems(props.errors)} type="secondary">Add Variant Name</Button>
    </Card>
  )
}

export default Variant
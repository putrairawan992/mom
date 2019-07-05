import React,{useState} from 'react'
import {Card, Row, Col} from 'antd'
import Button from '../../components/Button'
import ButtonTextIcon from '../../components/ButtonTextIcon'
import Upload from '../../components/Upload'
import Input from '../../components/Input'
import { apiPostWithToken } from '../../services/api'
import { PATH_UPLOAD } from '../../services/path/upload';


const VariantType = (props) => {
  return (
    <Row type="flex" align="middle" justify="center">
      <Col md={4}>
        Variant Type
      </Col>
      <Col md={16}>
        <Input
          onChange={props.handleChange}
          name={`variants.${props.index}.variantType`}
          onBlur={props.handleBlur}
        />
      </Col>
      <Col className="variant" md={4}>
        <Button onClick={() => props.cancelVariant(props.setFieldValue,props.index,`variants`)} >Cancel</Button>
      </Col>
    </Row>
  )
}

const Variant = (props) => {
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info,setFieldValue,key) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done' ) {
        getBase64(info.file.originFileObj, function(responseImageUrl) {
          setImageUrl(responseImageUrl);
          setLoading(false);
          setFieldValue(key,info.file.response)
        });
    }
  };

  const uploadImage = async ({onError, onSuccess,file}) => {
    try {
      var formData = new FormData();
      formData.append("file",file);
      const response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,formData);
      onSuccess(response.data.data)
    } catch (error) {
      console.log(error)
      onError(error)
      setLoading(false)
    }
  }
  
  console.log("ini error",props.errors)
  

  return(
    <Card title={<VariantType handleChange={props.handleChange} setFieldValue={props.setFieldValue} handleBlur={props.handleBlur} cancelVariant={props.cancelVariant} index={props.index}/>}>
      {
        props.variant.variantItems.map((l,i) => {
          return (
          <Row key={i} type="flex" align="middle" justify="center">
            <Col md={4}>
              <Upload
                type="no-style"
                imageUrl={imageUrl}
                loading={loading}
                name={`variants.${props.index}.variantItems.${i}.image`}
                customRequest={({onError, onSuccess,file}) => uploadImage({onError, onSuccess,file})}
                onChange={(info) => handleChange(info,props.setFieldValue,`variants.${props.index}.variantItems.${i}.image`)}
              />
            </Col>
            <Col  md={16}>
              <Input
                name={`variants.${props.index}.variantItems.${i}.name`}
                onChange={props.handleChange}
                onBlur={props.handleBlur}        
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
            </Col>
            <Col className="variant" md={4}>
              <ButtonTextIcon label="" onClick={() => props.removeVariantItems(i)}  style={{fontSize : "60px"}} icon="delete"/>
            </Col>
          </Row>
          )
        })
      }
      <Button width="full" onClick={() => props.addVariantItems()} type="secondary">Add Variant Name</Button>
    </Card>
  )
}

export default Variant
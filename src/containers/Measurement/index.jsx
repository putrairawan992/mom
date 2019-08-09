import React,{useState, useEffect} from 'react';
import {Row, Col, Card, Tag, Checkbox, Icon} from 'antd';
import Input from '../../components/Input';
import strings from '../../localization'

const Measurement = (props) => {

  const [actualWeight, setActualWeight] = useState("")
  const [width, setWidth] = useState("1")
  const [length, setLength] = useState("1")
  const [height, setHeight] = useState("1")
  const [volumetric, setVolumetric] = useState("0")
  //const [isFragile, setIsFragile] = useState(false);

  useEffect(() => {
    let volume = Number(width) * Number(length) * Number(height)
    let volumetricWeight = volume/6000
    let roundVolumetricWeight = Math.round(volumetricWeight * 100) / 100
    if(volume === 1){
      setVolumetric("0")
    }else{
      setVolumetric(`${roundVolumetricWeight}`)
    }
  },[actualWeight,width,length,volumetric,height])

  useEffect(() => {
    if(props.dataProduct){
      const information = props.dataProduct.information
      setHeight(information.measurement.dimension.height)
    }
  })

  return (
    <Card className="card" title={<div className="card-title">{strings.measurement}</div>}>
      <Row type="flex" align="middle">
        <Col md={24}>
          <div className="card-tittle-content">
            {strings.measurement_quote}
          </div>
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          <Row type="flex">
            <div className="card-content">{strings.actual_weight}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
        </Col>
        <Col md={8} className="col-height">
          <Input
            placeholder={strings.placeholder_weight}
            name="actualWeight"
            onChange={e => {
              setActualWeight(e.target.value)
              props.setFieldValue("actualWeight",e.target.value)
            }}
            type="number"
            onBlur={props.handleBlur}
            value={props.values.actualWeight}
            size="large"
            suffix={<div style={{fontSize: "14px"}}>{strings.kg}</div>}
            status={
              props.errors.actualWeight && props.touched.actualWeight ?
              "error" : "default"
            }
          />
            {
            (props.errors.actualWeight && props.touched.actualWeight) ? 
            (<div className="text-error-message">{props.errors.actualWeight}</div>) :
            null
          }
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          <Row type="flex">
            <div className="card-content">{strings.dimension}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
        </Col>
        <Col md={12} className="col-height">
          <Row type="flex" >
            <Col md={8} style={{paddingRight : "10px"}}>
                <Input
                  placeholder={strings.placeholder_width}
                  defaultValue=""
                  name="width"
                  onChange={e => {
                    setWidth(e.target.value)
                    props.setFieldValue('width', e.target.value)
                  }}
                  type="number"
                  onBlur={props.handleBlur}
                  value={props.values.width}
                  suffix={<div style={{fontSize: "14px"}}>{strings.cm}</div>}
                  size="large"
                  status={
                    props.errors.width && props.touched.width ?
                    "error" : "default"
                  }
                />
            </Col>
            <Col md={8} style={{paddingLeft : "10px"}}>
              <Input
                placeholder={strings.placeholder_length}
                name="length"
                onChange={e => {
                  setLength(e.target.value)
                  props.setFieldValue('length', e.target.value)
                }}
                type="number"
                onBlur={props.handleBlur}
                value={props.values.length}
                suffix={<div style={{fontSize: "14px"}}>{strings.cm}</div>}
                size="large"
                status={
                  props.errors.length && props.touched.length ?
                  "error" : "default"
                }
              />
            </Col>
            <Col md={8} style={{paddingLeft: "20px"}}>
              <Input
                placeholder={strings.placeholder_height}
                name="height"
                onChange={e => {
                  setHeight(e.target.value)
                  props.setFieldValue('height', e.target.value)
                }}
                type="number"
                onBlur={props.handleBlur}
                // value={height}
                value={props.values.height}
                suffix={<div style={{fontSize: "14px"}}>{strings.cm}</div>}
                size="large"
                status={
                  props.errors.height && props.touched.height ?
                  "error" : "default"
                }
              />
            </Col>
          </Row>
          {
            (props.errors.width && props.touched.width) || (props.errors.length && props.touched.length) || (props.errors.height && props.touched.height) ? 
            (<div className="text-error-message">{strings.dimension_measurement_errro}</div>) :
            null
          }
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          <div className="card-content">{strings.volumetric_weight}</div>
        </Col>
        <Col md={12}>
          <Input
            value={volumetric}
            suffix={<div style={{fontSize: "14px"}}>{strings.kg}</div>}
            size="large"
            disabled
            status="disabled"
          />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col md={15} offset={7}>
          <Checkbox name="isFragile" onClick={(e)=>props.setFieldValue('isFragile', e.target.checked)}>
            <span className="text-safety-orange">
              {strings.product_fragile} <Icon fill="red" type="info-circle"/>
            </span>
          </Checkbox>
        </Col>
      </Row>
    </Card>
  )
}

export default Measurement
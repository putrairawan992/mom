import React,{useState, useEffect} from 'react';
import {Row, Col, Card, Tag, Checkbox, Icon} from 'antd';
import Input from '../../components/Input';

const Measurement = (props) => {

  const [actualWeight, setActualWeight] = useState("")
  const [width, setWidth] = useState("1")
  const [length, setLength] = useState("1")
  const [height, setHeight] = useState("1")
  const [volumetric, setVolumetric] = useState("0")

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

  return (
    <Card className="card" title={<div className="card-title">Measurement</div>}>
      <Row type="flex" align="middle">
        <Col md={24}>
          <div className="card-tittle-content">
            Fill all the information on weight and dimension of the product, so the system can calculate the volumetric weight and used the data for shipping and delivery procedure.
          </div>
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          <Row type="flex">
            <div className="card-content">Actual Weight</div>
            <Tag className="tag">Required</Tag>
          </Row>
        </Col>
        <Col md={8} className="col-height">
          <Input
            placeholder="Weight"
            name="actualWeight"
            onChange={e => {
              setActualWeight(e.target.value)
              props.setFieldValue("actualWeight",e.target.value)
            }}
            type="number"
            onBlur={props.handleBlur}
            value={actualWeight}
            size="large"
            suffix={<div style={{fontSize: "14px"}}>Kg</div>}
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
            <div className="card-content">Dimension</div>
            <Tag className="tag">Required</Tag>
          </Row>
        </Col>
        <Col md={12} className="col-height">
          <Row type="flex" >
            <Col md={8} style={{paddingRight : "10px"}}>
                <Input
                  placeholder="Width"
                  defaultValue=""
                  name="width"
                  onChange={e => {
                    setWidth(e.target.value)
                    props.setFieldValue('width', e.target.value)
                  }}
                  type="number"
                  onBlur={props.handleBlur}
                  // value={width}
                  suffix={<div style={{fontSize: "14px"}}>cm</div>}
                  size="large"
                  status={
                    props.errors.width && props.touched.width ?
                    "error" : "default"
                  }
                />
            </Col>
            <Col md={8} style={{paddingLeft : "10px"}}>
              <Input
                placeholder="Length"
                name="length"
                onChange={e => {
                  setLength(e.target.value)
                  props.setFieldValue('length', e.target.value)
                }}
                type="number"
                onBlur={props.handleBlur}
                // value={length}
                suffix={<div style={{fontSize: "14px"}}>cm</div>}
                size="medium"
                status={
                  props.errors.length && props.touched.length ?
                  "error" : "default"
                }
              />
            </Col>
            <Col md={8} style={{paddingLeft: "20px"}}>
              <Input
                placeholder="Height"
                name="height"
                onChange={e => {
                  setHeight(e.target.value)
                  props.setFieldValue('height', e.target.value)
                }}
                type="number"
                onBlur={props.handleBlur}
                // value={height}
                suffix={<div style={{fontSize: "14px"}}>cm</div>}
                size="small"
                status={
                  props.errors.height && props.touched.height ?
                  "error" : "default"
                }
              />
            </Col>
          </Row>
          {
            (props.errors.width && props.touched.width) || (props.errors.length && props.touched.length) || (props.errors.height && props.touched.height) ? 
            (<div className="text-error-message">Please fill all required measurement to calculate volumetric weight.</div>) :
            null
          }
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          <div className="card-content">Volumetric Weight</div>
        </Col>
        <Col md={12}>
          <Input
            value={volumetric}
            suffix={<div style={{fontSize: "14px"}}>Kg</div>}
            size="large"
            disabled
            status="disabled"
            
          />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col md={15} offset={7}>
          <Checkbox >
            <span className="text-safety-orange">
              Product Is Fragile <Icon fill="red" type="info-circle"/>
            </span>
          </Checkbox>
        </Col>
      </Row>
    </Card>
  )
}

export default Measurement
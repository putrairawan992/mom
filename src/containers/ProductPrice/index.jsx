import React, {useState, useEffect} from 'react'
import {Card, Row, Col, Icon} from 'antd';
import Input from '../../components/Input'

const ProductPrice = (props) => {
  const [basePrice, setBasePrice] = useState("")
  const [domesticFee, setDomesticFee] = useState("")
  const [feeBySea, setFeeBySea] = useState("")
  const [feeByAir, setFeeByAir] = useState("")
  const [administration, setAdministration] = useState("")
  const [priceByAir, setPriceByAir] = useState("Rp 0")
  const [priceBySea, setPriceBySea] = useState("Rp 0")
  const [exchangeRate] = useState("Rp 2061.95")
  

  useEffect(() => {
    const splitRate = exchangeRate.split(" ")
    const rate = splitRate[1]
    let totalPriceBySea = ((Number(basePrice) + Number(domesticFee)) * Number(rate)) + Number(feeBySea) + Number(administration)
    let totalPriceByAir = ((Number(basePrice) + Number(domesticFee)) * Number(rate)) + Number(feeByAir) + Number(administration)
    setPriceBySea(`Rp ${totalPriceBySea}`)
    setPriceByAir(`Rp ${totalPriceByAir}`)
  },[basePrice,domesticFee,administration,feeBySea,feeByAir])


  return(
    <Card title="Product Price">
      <Row type="flex" align="middle">
        <Col span={7}>
           Base Price
        </Col>
        <Col span={15}>
          <Input 
            onChange={e => {
              setBasePrice(e.target.value)
              props.setFieldValue("basePrice",e.target.value)
            }}
            type="number"
            onBlur={props.handleBlur}
            name="basePrice"
            addonBefore={<Icon style={{fontSize : 20}} type="pay-circle" />}
            // prefix={<Icon type="pay-circle" style={{  height: "100%" }} />}
            />
            {
              props.errors.basePrice  && props.touched.basePrice? 
              (<div className="text-error-message">{props.errors.basePrice }</div>) :
              null
            }
        </Col>
      </Row>
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          Domestic Fee
        </Col>
        <Col md={15}>
          <Input
            value={domesticFee}
            name="domesticFee"
            type="number"
            onBlur={props.handleBlur}
            onChange={e => {
              setDomesticFee(e.target.value)
              props.setFieldValue("domesticFee",e.target.value)}}
            addonBefore={<Icon style={{fontSize : 20}} type="pay-circle" />}></Input>
             {
              props.errors.domesticFee &&  props.touched.domesticFee ? 
              (<div className="text-error-message">{props.errors.domesticFee }</div>) :
              null
            }
        </Col>
      </Row>
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          Shipment Fee
        </Col>
        <Col md={15}>
          Delivery fee (BR) from China to Indonesia
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          By Sea
        </Col>
        <Col md={15}>
          <Input
            addonBefore="Rp"
            value={feeBySea}
            type="number"
            name="feeBySea"
            onBlur={props.handleBlur}
            onChange={e => {
              setFeeBySea(e.target.value)
              props.setFieldValue('feeBySea',e.target.value)
            }}
          />
          {
            props.errors.feeBySea && props.touched.feeBySea ? 
            (<div className="text-error-message">{props.errors.feeBySea }</div>) :
            null
          }
        </Col>
      </Row>
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          By Air
        </Col>
        <Col md={15}>
          <Input
            addonBefore="Rp"
            value={feeByAir}
            type="number"
            onBlur={props.handleBlur}
            name="feeByAir"
            onChange={e => {
              setFeeByAir(e.target.value)
              props.setFieldValue('feeByAir',e.target.value)
            }}
          />
          {
            props.errors.feeByAir && props.touched.feeByAir ? 
            (<div className="text-error-message">{props.errors.feeByAir }</div>) :
            null
          }
        </Col>
      </Row>
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          Administration
        </Col>
        <Col md={15}>
          <Input
            addonBefore="Rp"
            type="number" 
            value={administration}
            onChange={e => setAdministration(e.target.value)}
          />
        </Col>
      </Row>
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          Exchange Rate
        </Col>
        <Col md={4}>
          <Input  value="¥ 1"/>
        </Col>
        <Col md={1}>
          =
        </Col>
        <Col md={10}>
          <Input  value={exchangeRate} ></Input>
        </Col>
      </Row>
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          Price By Sea
        </Col>
        <Col md={15}>
          <Input
            value={priceBySea}
          />

        </Col>
      </Row>
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={7}>
          Price By Air
        </Col>
        <Col md={15}>
          <Input
            value={priceByAir}
          />
        </Col> 
      </Row>
    </Card>
  )
}

export default ProductPrice
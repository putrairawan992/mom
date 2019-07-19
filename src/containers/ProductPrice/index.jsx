import React, {useState, useEffect} from 'react'
import {Card, Row, Col, Tag, Checkbox, Icon} from 'antd';
import Input from '../../components/Input';
import {apiGetWithoutToken} from '../../services/api';
import {PATH_EXCHANGE} from '../../services/path/rate'

const ProductPrice = (props) => {
  const [basePrice, setBasePrice] = useState("")
  const [domesticFee, setDomesticFee] = useState("")
  const [feeBySea, setFeeBySea] = useState("")
  const [feeByAir, setFeeByAir] = useState("")
  const [administration, setAdministration] = useState("")
  const [priceByAir, setPriceByAir] = useState("Rp 0")
  const [priceBySea, setPriceBySea] = useState("Rp 0")
  const [exchangeRate,setExchangeRate] = useState("Rp 0")
  
  useEffect(() => {
    const splitRate = exchangeRate.split(" ")
    const rate = splitRate[1]
    let totalPriceBySea = ((convertNumber(basePrice) + convertNumber(domesticFee)) * Number(rate)) + convertNumber(feeBySea) + convertNumber(administration)
    let totalPriceByAir = ((convertNumber(basePrice) + convertNumber(domesticFee)) * Number(rate)) + convertNumber(feeByAir) + convertNumber(administration)
    let ceilPriceBySea = formatCurrency(Math.ceil(totalPriceBySea/1000) * 1000)
    let ceilPriceByAir = formatCurrency(Math.ceil(totalPriceByAir/1000) * 1000)
    setPriceBySea(`Rp ${ceilPriceBySea}`)
    setPriceByAir(`Rp ${ceilPriceByAir}`)
  },[basePrice,domesticFee,administration,feeBySea,feeByAir,exchangeRate])

  useEffect(() => {
    const getRate = async() => {
      try {
        const response = await apiGetWithoutToken(PATH_EXCHANGE.RATE)
        const responseRate = response.data.data
        const currencyFromChina = responseRate.reduce(rate => {
          return rate.currencyFrom === 'CNY'
        })
        setExchangeRate(`Rp ${currencyFromChina.value}`)
        props.setFieldValue('rate',currencyFromChina)
      } catch (error) {
        console.log(error.response)
      }
    }
    getRate()
  },[])

  const handleChange = (event,key,setState) => {
    const toNumber = convertNumber(event.target.value)
    let currency = toNumber.toLocaleString()
    setState(`${currency}`)
    props.setFieldValue(key,toNumber)
  }

  const convertNumber = (string) =>{
    const toNumber = Number(string.replace(/\D/g, ''));
    return toNumber
  }

  const formatCurrency = (price) => {
    let number = Number(price)
    return number.toLocaleString()
  }

  return(
    <Card className="card" title={<div className="card-title">Product Price</div>}>
      <Row type="flex" align="middle">
        <Col span={props.grid.left}>
          <Row type="flex">
            <div className="card-content">
              Base Price
            </div>
            <Tag className="tag">Required</Tag>
          </Row>
        </Col>
        <Col span={props.grid.priceRight} className="col-height">
          <Input 
            onChange={e => {
              handleChange(e,'basePrice',setBasePrice)
            }}
            value={basePrice}
            onBlur={props.handleBlur}
            name="basePrice"
            size="large"
            prefix={<div style={{fontSize : "15px"}}>¥</div>}
            status={
              props.errors.basePrice  && props.touched.basePrice?
              "error": "default"
            }
            />
            {
              props.errors.basePrice  && props.touched.basePrice? 
              (<div className="text-error-message">{props.errors.basePrice }</div>) :
              null
            }
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle" justify="start">
        <Col md={props.grid.left}>
          <Row type="flex">
            <div className="card-content">
              Domestic Fee
            </div>
            
            <Tag className="tag">Required</Tag>
          </Row>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Input
            value={domesticFee}
            name="domesticFee"
            onChange={e => {
              handleChange(e,'domesticFee',setDomesticFee)
            }}
            onBlur={props.handleBlur}
            size="large"
            prefix={<div style={{fontSize : "15px"}}>¥</div>}
            status={
              props.errors.domesticFee &&  props.touched.domesticFee ? 
              "error" : "default"
            }
          />
             {
              props.errors.domesticFee &&  props.touched.domesticFee ? 
              (<div className="text-error-message">{props.errors.domesticFee }</div>) : null
            }
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex">
        <Col md={props.grid.left}>
          <Row type ="flex">
            <div className="card-content">
              Shipment Fee
            </div>
            <Tag className="tag">Required</Tag>
          </Row>
        </Col>
        <Col md={15}>
          <div className="card-sub-content" style={{width: "100%"}}>
            <p>Delivery fee (BR) from China to Indonesia</p>
          </div>
        </Col>
      </Row>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-sub-second-content">
            By Sea  
          </div>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Input
            prefix={"Rp"}
            value={feeBySea}
            name="feeBySea"
            onBlur={props.handleBlur}
            onChange={e => {
              handleChange(e,'feeBySea',setFeeBySea)
            }}
            size="large"
            status={
              props.errors.feeBySea && props.touched.feeBySea ?
              "error" : "default"
            }
          />
          {
            props.errors.feeBySea && props.touched.feeBySea ? 
            (<div className="text-error-message">{props.errors.feeBySea }</div>) :
            null
          }
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-sub-second-content">
            By Air
          </div>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Input
            prefix="Rp"
            value={feeByAir}
            onBlur={props.handleBlur}
            name="feeByAir"
            onChange={e => {
              handleChange(e,'feeByAir',setFeeByAir)
            }}
            size="large"
            status={
              props.errors.feeByAir && props.touched.feeByAir ? 
              "error" : "default"
            }
          />
          {
            props.errors.feeByAir && props.touched.feeByAir ? 
            (<div className="text-error-message">{props.errors.feeByAir }</div>) :
            null
          }
        </Col>
      </Row>
      <div className="separator"/>
      <Row>
        <Col md={11} offset={7}>
          <Checkbox >
            <span className="text-safety-orange">
              Shipment Price Refrences <Icon fill="red" type="info-circle"/>
            </span>
          </Checkbox>
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
            Administration
          </div>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Input
            prefix="Rp"
            value={administration}
            onChange={e => {
              handleChange(e,'administration',setAdministration)
            }}
            size="large"
          />
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
            Exchange Rate
          </div>
        </Col>
        <Col md={3}>
          <Input 
            value="¥ 1"
            size="large"
            disabled
            status="disabled"
          />
        </Col>
        <Col md={1}>
          <div style={{display: "flex",justifyContent: "center"}}>=</div>
        </Col>
        <Col md={8}>
          <Input
            value={exchangeRate}
            size="large"
            status="disabled"
            disabled
          />
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
            Price By Sea
          </div>
        </Col>
        <Col md={props.grid.priceRight}>
          <Input
            value={priceBySea}
            size="large"
            status="disabled"
            disabled
          />
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
          Price By Air
          </div>
        </Col>
        <Col md={props.grid.priceRight}>
          <Input
            value={priceByAir}
            size="large"
            disabled
            status="disabled"
          />
        </Col> 
      </Row>
    </Card>
  )
}

export default ProductPrice
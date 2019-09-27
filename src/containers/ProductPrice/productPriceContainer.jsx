import React, {useState, useEffect} from 'react'
import {apiGetWithoutToken} from '../../services/api';
import {PATH_EXCHANGE} from '../../services/path/rate'

export default function ProductPriceContainer (props) {
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
    let totalPriceBySea = ((convertToNumber(basePrice) + convertToNumber(domesticFee)) * Number(rate)) + convertToNumber(feeBySea) + convertToNumber(administration)
    let totalPriceByAir = ((convertToNumber(basePrice) + convertToNumber(domesticFee)) * Number(rate)) + convertToNumber(feeByAir) + convertToNumber(administration)
    let ceilPriceBySea = formatCurrency(Math.ceil(totalPriceBySea/1000) * 1000)
    let ceilPriceByAir = formatCurrency(Math.ceil(totalPriceByAir/1000) * 1000)
    setPriceBySea(`Rp ${ceilPriceBySea}`)
    setPriceByAir(`Rp ${ceilPriceByAir}`)
  },[basePrice,domesticFee,administration,feeBySea,feeByAir])

  useEffect(() => {
    const getRate = async() => {
      try {
        const response = await apiGetWithoutToken(PATH_EXCHANGE.RATE)
        const responseRate = response.data.data
        const currencyFromChina = responseRate.reduce(rate => {
          return rate.currencyFrom === 'CNY'
        })
        setExchangeRate(`Rp ${currencyFromChina.value}`)
        // props.setFieldValue('rate',currencyFromChina.value)
        props.onChange('rate',currencyFromChina.value)
      } catch (error) {
        console.log(error)
      }
    }
    getRate()
  },[])

  useEffect(() => {
    if(props.values.price){
      const base = props.values.basePrice
      const domestic =  props.values.domesticFee
      const admin = props.values.administration
      const air = props.values.feeByAir
      const sea = props.values.feeBySea
      const rate = props.values.rate
      const convert = numberWithSeparator(base)
      const convertDomestic = numberWithSeparator(domestic)
      const convertAdmin = numberWithSeparator(admin)
      const convertSea = numberWithSeparator(sea)
      const convertAir = numberWithSeparator(air)
      setFeeByAir(convertAir)
      setExchangeRate(`Rp ${rate}`)
      setFeeBySea(convertSea)
      setBasePrice(convert)
      setDomesticFee(convertDomestic)
      setAdministration(convertAdmin)
    }
  },[props.values.price, props.values.shipment])

  const handleChange = (event,key,setState) => {
    const value = event.target.value;
    const toNumber = convertToNumber(value);
    const convert = numberWithSeparator(toNumber);
    setState(convert);
    props.setFieldValue(key,toNumber)
  }

  const numberWithSeparator = (number) => {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

  const convertToNumber = (valueString) => (
    Number(valueString.replace(/[^0-9]/g, ''))
  );

  const formatCurrency = (price) => {
    let number = Number(price)
    return price.toLocaleString()
  }

  const onChangeNumber = (value,key,setState) => {
    setState(value)
    props.setFieldValue(key,value)
  }

  return (
    <React.Fragment>
      {
          props.children({
          basePrice, setBasePrice , domesticFee , setDomesticFee , feeBySea ,setFeeBySea ,
          feeByAir, setFeeByAir, administration, setAdministration , priceByAir, priceBySea, handleChange, exchangeRate
          })
      }
    </React.Fragment>
  )
}
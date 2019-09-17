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
        console.log(error)
      }
    }
    getRate()
  },[])

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

  return props.children({
    basePrice, setBasePrice , domesticFee , setDomesticFee , feeBySea ,setFeeBySea ,
    feeByAir, setFeeByAir, administration, setAdministration , priceByAir, priceBySea, handleChange
  })
}
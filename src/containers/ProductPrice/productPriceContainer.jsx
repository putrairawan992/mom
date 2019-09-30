import React, {useState, useEffect} from 'react'
import {apiGetWithoutToken} from '../../services/api';
import {PATH_EXCHANGE} from '../../services/path/rate';
import ProductPrice from "../../containers/ProductPrice";

export default function ProductPriceContainer ({
  values,
  onChange,
  errors,
  touched,
  handleBlur,
  grid,
}) {
  const [allPrice, setAllPrice] = useState ({
    basePrice : '',
    domesticFee : '',
    feeBySea : '',
    feeByAir : '',
    administration : '',
    priceByAir : 'Rp 0',
    priceBySea : 'Rp 0',
    exchangeRate : 'Rp 0',
  })
  
  useEffect(() => {
    const {basePrice, domesticFee, feeBySea, feeByAir, administration,exchangeRate} = allPrice
    const splitRate = exchangeRate.split(" ")
    const rate = splitRate[1]
    let totalPriceBySea = ((convertToNumber(basePrice) + convertToNumber(domesticFee)) * Number(rate)) + convertToNumber(feeBySea) + convertToNumber(administration)
    let totalPriceByAir = ((convertToNumber(basePrice) + convertToNumber(domesticFee)) * Number(rate)) + convertToNumber(feeByAir) + convertToNumber(administration)
    let ceilPriceBySea = formatCurrency(Math.ceil(totalPriceBySea/1000) * 1000)
    let ceilPriceByAir = formatCurrency(Math.ceil(totalPriceByAir/1000) * 1000)
    setAllPrice({
      ...allPrice , priceByAir : `Rp ${ceilPriceByAir}` , priceBySea : `Rp ${ceilPriceBySea}`
    })
  },[allPrice.basePrice, allPrice.domesticFee, allPrice.feeBySea, allPrice.feeByAir, allPrice.administration])

  useEffect(() => {
    const getRate = async() => {
      try {
        const response = await apiGetWithoutToken(PATH_EXCHANGE.RATE)
        const responseRate = response.data.data
        const currencyFromChina = responseRate.reduce(rate => {
          return rate.currencyFrom === 'CNY'
        })
        setAllPrice({
          ...allPrice , exchangeRate : `Rp ${currencyFromChina.value}`
        })
        onChange('rate',currencyFromChina.value)
      } catch (error) {
        console.log(error)
      }
    }
    getRate()
  },[])

  useEffect(() => {
    if(values.price){
      const base = values.basePrice
      const domestic = values.domesticFee
      const admin = values.administration
      const air = values.feeByAir
      const sea = values.feeBySea
      const rate = values.rate
      const convert = numberWithSeparator(base)
      const convertDomestic = numberWithSeparator(domestic)
      const convertAdmin = numberWithSeparator(admin)
      const convertSea = numberWithSeparator(sea)
      const convertAir = numberWithSeparator(air)
      setAllPrice({
        ...allPrice , 
        feeByAir : convertAir,
        exchangeRate : `Rp ${rate}`,
        feeBySea : convertSea,
        basePrice : convert,
        domesticFee : convertDomestic,
        administration : convertAdmin
      })
    }
  },[values.price, values.shipment])

  const newHandleChange = function (key, value) {
    const toNumber = convertToNumber(value)
    const convert = numberWithSeparator(toNumber)
    onChange(key, toNumber)
    setAllPrice({
      ...allPrice , [key] : convert
    })
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
    return price.toLocaleString()
  }

  return (
    <ProductPrice 
      errors={errors}
      touched={touched}
      handleBlur={handleBlur}
      grid={grid}
      newHandleChange={newHandleChange}
      allPrice={allPrice}
    />
  )
}
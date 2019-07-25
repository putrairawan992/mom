import React from 'react'

export default React.createContext({
  initialValues : {
    administration: "",
    actualWeight: "",
    variants: [{
      name : '',
      variantItems: [{
        name: '',
        image : ''
      }]
    }],
    listImages: [],
    supplier: "",
    basePrice: "",
    domesticFee: "",
    feeBySea: "",
    feeByAir: "",
    productNameOriginal: "",
    productName: "",
    category: [],
    description: "",
    width: "",
    length: "",
    height: "",
    rate: "",
    readyStock: true,
    quantity: "",
  }
})
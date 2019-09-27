const product = `
{
  information : {
    nameChinese : productNameOriginal,
    name : productName,
    description : description,
    category : {
      id : category[-1]
    },
    measurement : {
      weight : actualWeight,
      dimension : {
        width : width,
        length : length,
        height : height
      }
    },
    maxOrder : quantity,
    isFragile : isFragile
  },
  supplier : {
    id : supplier
  },
  price : {
    rate : rate,
    fee : {
      administration : administration || to_number('0'),
      domestic : domesticFee,
      shipmentFee : {
        air : feeByAir,
        sea : feeBySea
      }
    },
    basePrice : {
      cny : basePrice
    }
  },
  isReadyStock : readyStock,
  isActive : isActive,
  images : listImages[?largeUrl != ''].{
    largeUrl : largeUrl,
    mediumUrl : mediumUrl,
    smallUrl : smallUrl,
    isDefault : isDefault
  }
  variants : variants,
  videoUrl : videoUrl,
  id : id
}
`
export default product
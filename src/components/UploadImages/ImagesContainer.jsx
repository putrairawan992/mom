import React, {useState, useEffect} from 'react';
import UploadImages from "../../components/UploadImages"

export default function ImagesContainer ({
  maxImage,
  onChange,
  values,
  all,
  errors,
  touched
}) {
  const [imageUrl, setImageUrl] = useState({})
  const [loading, setLoading] = useState({})
  const [disable, setDisable] = useState({})
  const [arrImage, setArrImage] = useState({})
  const [count, setCount] = useState(0)
  const [loadingEdit, setLoadingEdit] = useState({})
  const [errorMessage, setErrorMessage] = useState({})
  
  useEffect(() => {
    const listImages = all
    if(listImages) {
      let temp = {...arrImage}
      let tempImageUrl = {...imageUrl}
      let tempDisable = {...disable}
      Object.keys(listImages).forEach((img) => {
        temp = {...temp , [img] : {  ...temp[img], 
          largeUrl : listImages[img].largeUrl,
          mediumUrl : listImages[img].mediumUrl,
          smallUrl : listImages[img].smallUrl,
          isDefault : listImages[img].isDefault
        }}
        tempImageUrl = {...tempImageUrl, [img] : listImages[img].mediumUrl}
        tempDisable = { ...tempDisable, [img] : true }
      })
      setArrImage(temp)
      setDisable(tempDisable)
      setImageUrl(tempImageUrl)
    }
  },[all])


  useEffect(() => {
    const initImage = () => {
      let obj = {}
      let tempObj = {}

      for(let i = 0; i < maxImage; i++){
        obj.largeUrl = ''
        obj.mediumUrl = ''
        obj.smallUrl = ''
        obj.isDefault = false
        const key = 'image' + i
        tempObj[key] = obj
      }
      setArrImage(tempObj)
    }
    initImage()
  },[])

  useEffect(() => {
    onChange('listImages',arrImage)
  },[arrImage])

  const changeDefault = (key) => {
    let temp = {...arrImage}
    Object.keys(temp).forEach(img => {
      if(img === key){
        temp = {...temp , [img] : {  ...temp[img] , isDefault : true } }
      }else{
        temp = {...temp , [img] : {  ...temp[img] , isDefault : false } }
      }
    })
    setArrImage(temp)
  }

  function saveImageOnState (file, key) {
    if(count === 0){
      setArrImage({
        ...arrImage , [key] : { 
          largeUrl : file.largeUrl , mediumUrl : file.mediumUrl , smallUrl : file.smallUrl , isDefault : true
        }
      })
    }else{
      setArrImage({
        ...arrImage , [key] : {
          largeUrl : file.largeUrl , mediumUrl : file.mediumUrl , smallUrl : file.smallUrl  , isDefault : arrImage[key].isDefault
        }
      })
    }
    setCount(count + 1)
  }


  const successUpload = function (responseImage, key){
    let loadingTemp = {...loading}
    let disableTemp = {...disable}
    let loadingEditTemp = {...loadingEdit}
    loadingTemp[key] = false
    disableTemp[key] = true
    loadingEditTemp[key] = false
    setImageUrl({
      ...imageUrl , [key] : responseImage.mediumUrl
    })
    setLoading(loadingTemp)
    setDisable(disableTemp)
    setLoadingEdit(loadingEditTemp)
    saveImageOnState(responseImage, key)
  }

  const loadingUpload = function (key) {
    let loadingTemp = {...loading}
    let tempLoadingEdit = {...loadingEdit}
    loadingTemp[key] = true
    tempLoadingEdit[key] = true
    setLoading(loadingTemp)
    setLoadingEdit(tempLoadingEdit)

  }

  const remove = (key) => {
    let tempArrImage = {
      ...arrImage
    }
    if(!tempArrImage[key].isDefault){
      setArrImage({
        ...tempArrImage , [key] : { ...tempArrImage[key] , largeUrl : '' , mediumUrl : '', smallUrl : '' , isDefault : false  }
      })
      setImageUrl({
        ...imageUrl , [key] : ''
      })
      setDisable({
        ...disable , [key] : false
      })
    }
  }

  const editImage = (key) => {
    const positionKey = key[key.length - 1]
    document.getElementsByClassName("upload")[positionKey].getElementsByTagName("input")[0].click()
  }

  const handleError = function (error) {
    setErrorMessage(error)
    setTimeout(() => {
      setErrorMessage("")
    },4000)
  }

  return (
    <UploadImages 
      editImage={editImage}
      remove={remove}
      arrImage={arrImage}
      imageUrl={imageUrl}
      disable={disable}
      successUpload={successUpload}
      loadingUpload={loadingUpload}
      handleError={handleError}
      values={values}
      errors={errors}
      touched={touched}
      errorMessage={errorMessage}
      changeDefault={changeDefault}
    />
  )
}
import {useState, useEffect} from 'react'

export default function ImagesContainer (props) {
  const [imageUrl, setImageUrl] = useState({})
  const [loading, setLoading] = useState({})
  const [disable, setDisable] = useState({})
  const [arrImage, setArrImage] = useState({})
  const [count, setCount] = useState(0)
  const [statusFile, setStatusFile] = useState(false)
  const [statusSize, setStatusSize] = useState(false)
  const [dimension, setDimension] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState({})
  const [countLoading, setCountLoading] = useState(0)

  // useEffect(() => {
  //   setCountLoading(countLoading )
  // },[countLoading])
  
  
  useEffect(() => {
    const listImages = props.all
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
      setCount(count +1)
    }
  },[props.all])


  useEffect(() => {
    const initImage = () => {
      const {maxImage} = props
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
    let payloadArray = Object.keys(arrImage).map(key => {
      return arrImage[key]
    })
    const filterPayload = payloadArray.filter(pay => {
      return pay.largeUrl
    })
    props.onChange('listImages',arrImage)
    // props.handleChangeValue(arrImage, 'listImages')
  },[arrImage])

  const timeOut = (setState, time) => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, time)
  }

  const errorType = function (type) {
    switch (type) {
      case 'type' : return timeOut(setStatusFile, 4000);
      break;
      case 'size' : return timeOut(setStatusSize, 4000)
      break;
      case 'dimension' : return timeOut(setDimension, 4000)
    }
  }

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

  const setError = (key) => {
    let loadingTemp = {...loading}
    let tempLoadingEdit = {...loadingEdit}
    loadingTemp[key] = false
    tempLoadingEdit[key] = false
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
    console.log(error)
  }

  return props.children({
    editImage , remove , changeDefault ,
    statusFile, statusSize, dimension, arrImage , imageUrl, loading, loadingEdit ,disable, 
    successUpload, loadingUpload, errorType, setError, handleError, values : props.values
  })
}
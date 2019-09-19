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

  useEffect(() => {
    setCountLoading(countLoading )
  },[countLoading])
  
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
        obj.count = 0
        const key = 'image' + i
        tempObj[key] = obj
      }
      setArrImage(tempObj)
    }
    initImage()
  },[])

  useEffect(() => {
    props.getPayloadImage(arrImage)
  },[arrImage])

  // const checkDimension = (file) => {
  //   return new Promise((resolve, reject) => {
  //     let _URL = window.URL || window.webkitURL;
  //     var image = new Image();
  //     image.src = _URL.createObjectURL(file)
  //     image.onload = function( ) {
  //       let width = image.naturalWidth
  //       let height = image.naturalHeight
  //       if(width > 450  && height >450 ){
  //         resolve(true)
  //       }else{
  //         reject(false)
  //       }
  //     };
  //   })
  // }
  
  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // }

  // const beforeUpload = (file) => {
  //   const isPng = file.type === 'image/png'
  //   const isJpeg = file.type === 'image/jpeg'
  //   const isJPG = file.type === 'image/jpg';
  //   const isLt2M = file.size <= 3145728;
  //   if( !isJPG && !isJpeg && !isPng ) {
  //     timeOut(setStatusFile, 5000)
  //     return false
  //   }
  //   if(!isLt2M){
  //     timeOut(setStatusSize, 5000)
  //     return false
  //   }      
  // }

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

  // const handleChange = (info,key,arrayHelpers) => {
  //   let loadingTemp = {...loading}
  //   if (info.file.status === 'uploading') {
  //     loadingTemp[key] = true
  //     setLoading(loadingTemp)
  //     return;
  //   }
  //   if (info.file.status === 'done' ) {
  //       let disableTemp = {...disable}
  //       getBase64(info.file.originFileObj, function() {
  //         let temp = info.file.response.mediumUrl
  //         loadingTemp[key] = false;
  //         disableTemp[key] = true;
  //         setImageUrl({
  //           ...imageUrl , [key] : temp
  //         })
  //         setLoading(loadingTemp);
  //         setDisable(disableTemp);
  //         saveImageOnState(info.file.response, key)
  //       });
  //   }
  // };

  // const uploadImage = async ({onError, onSuccess,file},index) => {
  //   let tempLoadingEdit = {...loadingEdit}
  //   tempLoadingEdit[index] = true
  //   setLoadingEdit(tempLoadingEdit)
  //     let formData = new FormData();
  //     formData.append("file",file);
  //     return checkDimension(file)
  //       .then(() => {return ImageRepo.upload({params : formData})})
  //       .then(response => {
  //         onSuccess(response.data.data)
  //         tempLoadingEdit[index] = false
  //         setLoadingEdit(tempLoadingEdit)
  //       })
  //       .catch ((error) => {
  //         onError(error)
  //         setError(index)
  //         timeOut(setDimension,500)
  //       })
  // }

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

  return props.children({
    editImage , remove , changeDefault ,
    statusFile, statusSize, dimension, arrImage , imageUrl, loading, loadingEdit ,disable, 
    successUpload, loadingUpload, errorType, setError
  })
}
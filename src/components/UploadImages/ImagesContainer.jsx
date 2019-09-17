import {useState, useEffect} from 'react'
import { apiPostWithToken } from '../../services/api'
import {PATH_UPLOAD} from '../../services/path/upload'

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

  const checkDimension = (file) => {
    return new Promise(resolve => {
      let _URL = window.URL || window.webkitURL;
      var image = new Image();
      image.src = _URL.createObjectURL(file)
      image.onload = function(e ) {
        let dimension = {}
          dimension.width = image.naturalWidth
          dimension.height = image.naturalHeight
        resolve(dimension)   
      };
    })
  }
  
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file) => {
    const isPng = file.type === 'image/png'
    const isJpeg = file.type === 'image/jpeg'
    const isJPG = file.type === 'image/jpg';
    const isLt2M = file.size <= 3145728;
    if( !isJPG && !isJpeg && !isPng ) {
      timeOut(setStatusFile, 5000)
      return false
    }
    if(!isLt2M){
      timeOut(setStatusSize, 5000)
      return false
    }      
  }

  const timeOut = (setState, time) => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, time)
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

  const handleChange = (info,key,arrayHelpers) => {
    let loadingTemp = {...loading}
    if (info.file.status === 'uploading') {
      loadingTemp[key] = true
      setLoading(loadingTemp)
      return;
    }
    if (info.file.status === 'done' ) {
        let disableTemp = {...disable}
        getBase64(info.file.originFileObj, function() {
          let temp = info.file.response.mediumUrl
          loadingTemp[key] = false;
          disableTemp[key] = true;
          setImageUrl({
            ...imageUrl , [key] : temp
          })
          setLoading(loadingTemp);
          setDisable(disableTemp);
          saveImageOnState(info.file.response, key)
        });
    }
  };

  const uploadImage = async ({onError, onSuccess,file},index) => {
    let tempLoadingEdit = {...loadingEdit}
    tempLoadingEdit[index] = true
    setLoadingEdit(tempLoadingEdit)
    try {
      var formData = new FormData();
      formData.append("file",file);
      const isDimension = await checkDimension(file)
      if(isDimension.width > 450 && isDimension.height > 450){
        const response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,formData);
        onSuccess(response.data.data)
        tempLoadingEdit[index] = false
        setLoadingEdit(tempLoadingEdit)
      }else{
        timeOut(setDimension, 5000)
        setError(index)
      }
    } catch (error) {
      onError(error)
      setError(index)
    }
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
    editImage , remove , uploadImage, handleChange, changeDefault, beforeUpload ,
    statusFile, statusSize, dimension, arrImage , imageUrl, loading, loadingEdit ,disable
  })
}
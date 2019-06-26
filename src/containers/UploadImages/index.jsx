import React,{useState, useEffect} from 'react'
import Upload from '../../components/Upload'
import { apiPostWithToken } from '../../services/api'
import {PATH_UPLOAD} from '../../services/path/upload'

const UploadImages = (props) => {
  const [imageUrl, setImageUrl] = useState([])
  const [loading, setLoading] = useState([])
  const [disable, setDisable] = useState([])
  const [arrImage, setArrImage] = useState([])
  const [images , setImages ] = useState(
    [
      {
        large:'',
        medium: '',
        small: '',
        isDefault : false,
      },
      {
        large:'',
        medium: '',
        small: '',
        isDefault : false,
      },
      {
        large:'',
        medium: '',
        small: '',
        isDefault : false,
      },
      {
        large:'',
        medium: '',
        small: '',
        isDefault : false,
      },
      {
        large:'',
        medium: '',
        small: '',
        isDefault : false,
      }
    ]
  )
  
  useEffect(() => {
    // setArrImage();
    initImage()
  },[])

  const initImage = () => {
    const {maxImage} = props
    let obj = {}
    let arr = []
    for(let i = 0; i< maxImage; i++){
      obj.large = ''
      obj.medium = ''
      obj.small = ''
      obj.isDefault = false
      arr.push(obj)
     
    }
    // return arr;
    setArrImage(arr)
    //console.log(arrImage)
  }

  const changeDefault = (index,props) => {
    images.forEach((image,i) => {
      if(index === i){
        image.isDefault = true
      }else{
        image.isDefault = false
      }
    })
    const newImage = images
    setImages([...newImage])
    console.log("xxxx",images)
  }
  const getAllImage = (response,index) => {

    // images.forEach((image,i) => {
    //   if(index === i){
    //     image.large = response.data.large
    //     image.medium = response.data.medium
    //     image.small = response.data.small
    //   }
    // })
    // const newImage = [...images]
    // newImage[index].large = response.data.large
    // setImages([...newImage])
    // console.log(images)
    //console.log({index: index,arrImage: arrImage});
    let arrImageTemp = [...arrImage]
    arrImageTemp[0].large = response.data.large
    setArrImage(...arrImageTemp)
    console.log(arrImage)
    // arrImage.forEach((image,i) => {
    //   if(i === index){
    //     image.large = response.data.large
    //   }
    // })
    // console.log("temp",arrImage)
    // setArrImage(arrImageTemp);
    // console.log("index:",index)
    // arrImageTemp[2].large = "tes"
    // console.log(arrImage)
    // console.log(arrImageTemp)
    // setArrImage([...arrImageTemp])
    // console.log(arrImageTemp)
    // console.log(arrImage)

  }
  // console.log(arrImage)



  const removeImageInArray = (index) => {
    images.forEach((image,i) => {
      if(index === i){
        image.large = ''
        image.medium = ''
        image.small = ''
      }
    })
    const newImage = images
    setImages([...newImage])
    console.log("===",images)
  }

  const handleChange = (info,index) => {
    let loadingTemp = [...loading]
    if (info.file.status === 'uploading') {
      loadingTemp[index] = true
      setLoading(loadingTemp)
      return;
    }
    if (info.file.status === 'done' ) {
        let imageUrlTemp = [...imageUrl]
        let disableTemp = [...disable]
        getBase64(info.file.originFileObj, function(responseImageUrl) {
          imageUrlTemp[index]=responseImageUrl
          loadingTemp[index] = false
          disableTemp[index] = true
          setImageUrl(imageUrlTemp)
          setLoading(loadingTemp)
          setDisable(disableTemp)
        });
    }
};
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


  const uploadImage = async ({onError, onSuccess,file},index) => {
    console.log("======",arrImage)
    var formData = new FormData()
    formData.append("file",file)
    // getArrImage()x
    try {
      var formData = new FormData()
      formData.append("file",file)
      const response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,formData)
      getAllImage(response.data,index)
      onSuccess(response.data.data)
    } catch (error) {
      console.log(error)
      onError(error)
    }
  }

  const remove = (index) => {
    imageUrl[index] = ''
    setImageUrl(imageUrl)
    disable[index] = false
    setDisable(disable)
    removeImageInArray(index)
  }

    return (
      <React.Fragment>
        {
  
    //        return (
    //           <Upload
    //             imageUrl={imageUrl[index]}
    //             key={index}
    //             onChange={(info) => handleChange(info,index)}
    //             // type={image.isDefault ? "default": "non-default"}
    //             loading={loading[index]}
    //             disabled={disable[index]}
    //             remove={() => remove(index)}
    //             customRequest={({onError, onSuccess,file}) => uploadImage({onError, onSuccess,file},index)}
    //             // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    //             changeDefault={changeDefault}
    //             index={index}
    //           />
    //   )}
    // }
          [...Array(props.maxImage)].map((image,index) => {
            return (
              <Upload
                imageUrl={imageUrl[index]}
                key={index}
                onChange={(info) => handleChange(info,index)}
                // type={image.isDefault ? "default": "non-default"}
                loading={loading[index]}
                disabled={disable[index]}
                remove={() => remove(index)}
                customRequest={({onError, onSuccess,file}) => uploadImage({onError, onSuccess,file},index)}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                changeDefault={changeDefault}
                index={index}
              />
            )
          })
        }
      </React.Fragment>
    )

}

export default UploadImages
import React,{useState} from 'react'
import Container from './container'

const UploadImages = () => {
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
    images.forEach((image,i) => {
      if(index === i){
        image.large = response.data.large
        image.medium = response.data.medium
        image.small = response.data.small
      }
    })
    const newImage = images
    setImages([...newImage])
    console.log("===",images)
  }

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
    return (
      <React.Fragment>
        {
          images.map((image,index) => {
            return (
              <Container
                key={index}
                image={image}
                getAllImage={getAllImage}
                changeDefault={changeDefault}
                index={index}
                removeImageInArray={removeImageInArray}
              />
            )
          })
        }
      </React.Fragment>
    )
}

export default UploadImages
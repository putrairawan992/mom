import React from 'react'
import { Upload as UploadAnt, Icon } from 'antd'
import Button from '../Button'
import './style.sass'

const Upload = props => {
  const uploadButton = (
    <div>
      <Icon type={props.loading ? 'loading' : 'plus'}></Icon>
    </div>
  )

  const imageUpload = (
    <div className="containerUpload">
      <img src={props.imageUrl}  alt="avatar"/>
      <Icon type="camera" className="cameraIcon"/>
      <Icon type="delete" className="deleteIcon"/>
      {
        props.type === 'default' ?
        <Button width="full" type="upload-default">Default</Button>:
        <Button width="full" type="upload-non-default">Set Default</Button>
      }
      
      
    </div>
  )

  return(
    <UploadAnt 
      {...props}
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      >
      {props.imageUrl ? imageUpload : uploadButton}
    </UploadAnt>
  )
}

export default Upload
import React from 'react'
import { Upload as UploadAnt, Icon } from 'antd'
import Button from '../Button'
import propTypes from 'prop-types'
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
      <Icon onClick={() => props.remove(props.index)} type="delete" className="deleteIcon"/>
      <Button width="full"
        onClick={() => props.changeDefault(props.index,props)} 
        className={props.type === 'default' ? 'mp-btn-upload' : 'mp-btn-upload-non-default'}
        >
        {props.type === 'default' ? 'Default' : 'Set Default' }
      </Button>
    </div>
  )

  return(
    <UploadAnt 
      {...props}
      name="avatar"
      listType="picture-card"
      // showUploadList={{showRemoveIcon : true,showPreviewIcon:false}}
      showUploadList={false}
      >
      {props.imageUrl ? imageUpload : uploadButton}
    </UploadAnt>
  )
}

Upload.propTypes = {
  customeRequest: propTypes.func,
  action :propTypes.string,
  changeDefault: propTypes.func,
  remove: propTypes.func,
  type: propTypes.string,
  disabled: propTypes.bool,
  imageUrl: propTypes.string,
  onChange: propTypes.func
}

export default Upload
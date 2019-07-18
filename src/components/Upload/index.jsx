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
      {
        props.type === 'no-style' ? 
        <>
          <img src={props.imageUrl}  alt="avatar"/> 
          <div className="top-icon">
          <Icon type="camera" onClick={() => props.editImage(props.index)}  className="cameraIcon"/>
          <Icon  type="delete" onClick={() => props.remove(props.index,props.imageUrl)} className="deleteIcon"/>
          </div>
        </>
        :
        <>
          <img src={props.imageUrl}  alt="avatar"/>
          <div className="top-icon">
          <Icon type="camera" onClick={() => props.editImage(props.index)} className="cameraIcon"/>
          <Icon onClick={() => props.remove(props.index)} type="delete" className="deleteIcon"/>
          </div>
          <Button width="full"
            onClick={() => props.changeDefault(props.index,props)} 
            className={props.type === 'default' ? 'mp-btn-upload' : 'mp-btn-upload-non-default'}
            >
            {props.type === 'default' ? 'Default' : 'Set Default' }
          </Button>
        </>
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

Upload.propTypes = {
  customeRequest: propTypes.func,
  action :propTypes.string,
  changeDefault: propTypes.func,
  remove: propTypes.func,
  type: propTypes.oneOf(['default', 'non-default','no-style']),
  disabled: propTypes.bool,
  imageUrl: propTypes.string,
  onChange: propTypes.func
}

export default Upload
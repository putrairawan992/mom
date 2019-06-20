import React from 'react'
import { Upload as UploadAnt, Icon } from 'antd'

const Upload = props => {
  const uploadButton = (
    <div>
      <Icon type={props.loading ? 'loading' : 'plus'}></Icon>
    </div>
  )

  return(
    <UploadAnt {...props}>
      {props.imageUrl ? <img src={props.imageUrl} width="200px" alt="avatar"/> : uploadButton}
      {/* {uploadButton} */}
    </UploadAnt>
  )
}

export default Upload
import { apiPostWithToken } from "../../services/api"
import {PATH_UPLOAD} from '../../services/path/upload'

async function upload(props) {
  const param = props.params
  let response = ''
  try {
    response = await apiPostWithToken(PATH_UPLOAD.UPLOAD,param);
    return response
  } catch (error) {
    response = error
    return response
  }
  // return response
}

const Image = {
  upload : upload
}

export default Image
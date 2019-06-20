import React,{useState,setState} from 'react'
import Upload from '../../components/Upload'
import axios from 'axios'

const Product = () => {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6Ijg2MDNhMDg3LTgxNWUtNDZiNy1hNzgxLWQ2YzljNDU3ODdlNSIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImN1c3RvbWVyQG1vbmdnb3Blc2VuLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sIm5hbWUiOiJjdXN0b21lciBtb25nZ29wZXNlbiIsImV4cCI6MTYwNDIyMDE4MSwiYXV0aG9yaXRpZXMiOlsiQ1VTIiwiODYwM2EwODctODE1ZS00NmI3LWE3ODEtZDZjOWM0NTc4N2U1Il0sImp0aSI6IjQ0MTQ3NWI5LTRlOGUtNDc4NC04YzI1LWNiMDk4MTQxZDEyOSIsImVtYWlsIjoiY3VzdG9tZXJAbW9uZ2dvcGVzZW4uY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.Mgm2jwXG1ZtpZbD3MBqddpl5tGXWeMTSpQyJC2qb3IsjLBjaVW7GxuPtdFcjje9qdML115vlrst0NGF3_LVHKnwCmk1OMCQxga7RNA4JsTlzGZTc4dslFEPDNyfm0G6TFxfuyheZ92DSol0sF7ZZT2D1BZAl2fzjTspJLF4JAaaOHrhqzL4M1Riax-xuEUNVV09wHQ8M85O5TBrBuYrS16PJfqJvC_OgglLawK22lvfQN3HQ3yj1BpUCp_lHmZhzU_B-DtPKtlcBYEj2YF9V-0QhJCoovZ-23VUQ4Zy2DRO_N5SPvJkJwl1Q9CoGGuS_iq51q68decM70HHRQCsf9g'
 
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const handleChange = info => {
    console.log("== ini iinfo",info)
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl(imageUrl),
        setLoading(false)
      );
    }
    
  };

  const uploadImage = (file) => {
    var formData = new FormData()
    formData.append("file",file)
    console.log("iini file",file)
    
    return axios.post('http://eb875f72.ngrok.io/api/v1/image/upload',formData,{
      headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(data => {
      console.log(data)      
    })
    .catch(error => console.log(error))
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      onChange={handleChange}
      loading={loading}
      showUploadList={false}
      imageUrl={imageUrl}
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      customRequest={uploadImage}
    />
  )
}

export default Product
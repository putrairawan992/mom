import React,{useState} from 'react'
import Upload from '../../components/Upload'
import axios from 'axios'
// const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6Ijg2MDNhMDg3LTgxNWUtNDZiNy1hNzgxLWQ2YzljNDU3ODdlNSIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImN1c3RvbWVyQG1vbmdnb3Blc2VuLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sIm5hbWUiOiJjdXN0b21lciBtb25nZ29wZXNlbiIsImV4cCI6MTYwNDIyMDE4MSwiYXV0aG9yaXRpZXMiOlsiQ1VTIiwiODYwM2EwODctODE1ZS00NmI3LWE3ODEtZDZjOWM0NTc4N2U1Il0sImp0aSI6IjQ0MTQ3NWI5LTRlOGUtNDc4NC04YzI1LWNiMDk4MTQxZDEyOSIsImVtYWlsIjoiY3VzdG9tZXJAbW9uZ2dvcGVzZW4uY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.Mgm2jwXG1ZtpZbD3MBqddpl5tGXWeMTSpQyJC2qb3IsjLBjaVW7GxuPtdFcjje9qdML115vlrst0NGF3_LVHKnwCmk1OMCQxga7RNA4JsTlzGZTc4dslFEPDNyfm0G6TFxfuyheZ92DSol0sF7ZZT2D1BZAl2fzjTspJLF4JAaaOHrhqzL4M1Riax-xuEUNVV09wHQ8M85O5TBrBuYrS16PJfqJvC_OgglLawK22lvfQN3HQ3yj1BpUCp_lHmZhzU_B-DtPKtlcBYEj2YF9V-0QhJCoovZ-23VUQ4Zy2DRO_N5SPvJkJwl1Q9CoGGuS_iq51q68decM70HHRQCsf9g'
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjhlYTNlMjY2LWQ0YjUtNDUyOS04ZjFkLTUzZmNmMmQ0ZDU5ZCIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6InN1cEBtb25nZ29wZXNlbi5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiLCJ0cnVzdCJdLCJuYW1lIjoiIiwiZXhwIjoxNjA0NTYwNzM5LCJhdXRob3JpdGllcyI6WyI4ZWEzZTI2Ni1kNGI1LTQ1MjktOGYxZC01M2ZjZjJkNGQ1OWQiLCJTQU0iXSwianRpIjoiNTA2YjQ2OWYtMWFmNS00MDcwLTgyZjctNjZhNDc3MzhkNjNkIiwiZW1haWwiOiJzdXBAbW9uZ2dvcGVzZW4uY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.O3Cm5-wvkmT-rGMXnYNkY5QgTkVDoDnSW2w7WOoEk737FkZJL6X98Xuk4W_PeTmTQc6T6Mlw5EQvAD5w0DzarDvVHVutTnnVCwV1L9VP9Hj3eRlNFi7_J22nYhMvfmb7KRMQZ8ep_-BquLcdHcXZyrc7fl2ZeLlczuCVMzfo3c2OKnGx1yJPDcxU4l8OxyhvtP3d_-ktDjLri9cO8Cv4K_0JVbH32YDtVrKtyZX-9Vcmyw79bBmBar3txVf_u4ParkcSFGByOk30heWR4XPxjNOrOhggUJePrcff9WCMU7ZlxQ10vdexNZuV8_lWl9iUNoXharkGix85g3YvhZ-Uog'
const Container = (props) => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(false)
  const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true)
        return;
      }
      if (info.file.status === 'done' ) {
          getBase64(info.file.originFileObj, imageUrl =>
            setImageUrl(imageUrl),
            setLoading(false),
            setDisable(true)
          );
      }
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const remove = (index) => {
    setImageUrl('')
    setDisable(false)
    props.removeImageInArray(index)
  }

  const uploadImage = ({onError, onSuccess,file}) => {
    var formData = new FormData()
    formData.append("file",file)   
    return axios.post('http://192.168.11.116:8100/api/v1/image/upload',formData,{
      headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress(progressEvent){
        // console.log("jalan gk nih")
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        // console.log(percentCompleted)
      },
    })
    .then(response => {
      onSuccess(response)
      props.getAllImage(response.data,props.index)
    })
    .catch(error => {
      onError(error)
    })
  }

  return(
    <Upload
      imageUrl={imageUrl}
      onChange={(info) => handleChange(info)}
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      type={props.image.isDefault ? "default": "non-default"}
      loading={loading}
      disabled={disable}
      remove={remove}
      customRequest={uploadImage}
      image={props.image}
      changeDefault={props.changeDefault}
      noimage={props.noimage}
      index={props.index}
    />
  )
}

export default Container
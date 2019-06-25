---
name: Upload
menu: Components
---

import { Playground, Props } from 'docz'
import 'antd/dist/antd.css'
import Upload from './'
import {useState} from 'react'

#Upload
This is upload of Monggopesen

## Properties (props)
<Props of={Upload} />

## Purpose Of Props
```
action : Uploading URL
onChange: A callback function, can be executed when uploading state is changing
customRequest: override for the default xhr behavior allowing for additional customization and ability to implement your own XMLHttpRequest	
disabled: disable upload button
type : type button after upload 'default'/'non-default'
```


## Playground

### Upload
<Playground>
  {
    () => {
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

      const remove = () => {
        setImageUrl('')
        setDisable(false)
      }
      return (
        <Upload
          imageUrl={imageUrl}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={(info) => handleChange(info)}
          loading={loading}
          type="default"
          disabled={disable}
          remove={remove}
        />
      )


    }
  }
</Playground>
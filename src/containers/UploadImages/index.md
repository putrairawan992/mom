---
name: Upload Images
menu: Containers
---

import { Playground, Props } from 'docz'
import "antd/dist/antd.css";
import UploadImages from './'
import Button from '../../components/Button'

# Upload Image Container
This is Container for Upload Images

## Properties (props)
<Props of={UploadImages}/>

## Details
no details

## Purpose of Props
```
maxImage : Max Image for upload
```

## PlayGround
<Playground>
  <UploadImages maxImage={2}
  getPayloadImage={() => {
    console.log("")
  }}
  />
</Playground>
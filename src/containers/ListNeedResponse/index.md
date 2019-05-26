---
name: List Need Response
menu: Containers
---

import { Playground, Props } from 'docz'
import "antd/dist/antd.css";
import ListNeedResponse from './'
import { dataNeedResponse } from "../../dataSource/need_response";
import { PrintJSON } from "../../helpers/printJSON.js";

# List Need Response
This is list need response of Monggopesen

## Properties (props)
<Props of={ListNeedResponse} />

## Purpose Of Props
- Data: is list of order that need repsonse, it will received from API

## Details
```
You can response, filter and search order that will need to response in this module
```

### Sample const dataNeedResponse :
```
{  
   "code":"200",
   "message":"OK",
   "data":[  
      {  
         "invoiceId":"a13e8478-7a99-4b08-b8f7-1ada824f4113",
         "invoiceNumber":"INV2019042112",
         "indexes":[  
            {  
               "id":"67890-789-890-67890",
               "productId":"5cb4239f57caac6ca19d5120",
               "productName":"Mouse keren 4300000010",
               "productNameChina":"茂物 哥打胡亚 Mouse keren",
               "productQuantity":"3",
               "productImage":"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-04-09T10:52:30.993Z_ANONYMOUS",
               "note":"kirim kerumah ibu hendrik",
               "price":80.9,
               "variants":[  
                  {  
                     "name":"warna",
                     "value":"biru",
                     "description":"warna biru"
                  },
                  {  
                     "name":"ukuran",
                     "value":"24",
                     "description":"ukuran 24"
                  }
               ],
               "supplier":{  
                  "name":"JING GUAN LTD",
                  "address":"CHINA",
                  "contact":{  
                     "email":"jin@mailinator.com",
                     "phone":"0912-0909"
                  }
               }
            }
         ]
      },
      {  
         "invoiceId":"a13e8478-7a99-4b08-b8f7-1ada824f4114",
         "invoiceNumber":"INV2019042112",
         "indexes":[  
            {  
               "id":"67890-789-890-67890",
               "productId":"5cb4239f57caac6ca19d5120",
               "productName":"Mouse keren 4300000010",
               "productNameChina":"茂物 哥打胡亚 Mouse keren",
               "productQuantity":"2",
               "productImage":"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-04-09T10:52:30.993Z_ANONYMOUS",
               "note":"kirim kerumah ibu hendrik",
               "price":80.9,
               "variants":[  
                  {  
                     "name":"warna",
                     "value":"biru",
                     "description":"warna biru"
                  },
                  {  
                     "name":"ukuran",
                     "value":"24",
                     "description":"ukuran 24"
                  }
               ],
               "supplier":{  
                  "name":"JING GUAN LTD",
                  "address":"CHINA",
                  "contact":{  
                     "email":"jin@mailinator.com",
                     "phone":"0912-0909"
                  }
               }
            }
         ]
      }
   ],
   "total":2
}
```

## Playground
<Playground>
    <ListNeedResponse data={dataNeedResponse.data} />
</Playground>
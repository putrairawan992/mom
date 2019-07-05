---
name: Modal Supplier
menu: Container
---

import { useState } from 'react';
import { Playground, Props } from 'docz'
import "antd/dist/antd.css";
import Button from "../../components/Button";
import ModalSupplier from './'
import OrderVariant from "../../components/OrderVariant";

# Modal Supplier

This is Modal Supplier of Monggopesen

## Properties (props)

<Props of={ModalSupplier} />

## Purpose Of Props

- Indexes: detail information of ordered product and product supplier

## Details

```
Get information about order detail
Get information about product supplier
You can copy order detail and email of the supplier
```

## Playground

<Playground>
{() => {
     const order = {
        "invoiceId": "a13e8478-7a99-4b08-b8f7-1ada824f4113",
        "invoiceNumber": "INV2019042112",
        "indexes": [
          {
            "id": "67890-789-890-67890",
            "productId": "5cb4239f57caac6ca19d5120",
            "productName": "Mouse keren 4300000010",
            "productNameChina" : "茂物 哥打胡亚 Mouse keren",
            "productQuantity": "3",
            "productImage": "https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-04-09T10:52:30.993Z_ANONYMOUS",
            "note": "kirim kerumah ibu hendrik",
            "price": 80.9,
            "variants": [
              {
                "name": "warna",
                "value": "biru",
                "description": "warna biru"
              },
              {
                "name": "ukuran",
                "value": "24",
                "description": "ukuran 24"
              }
            ],
            "supplier": {
              "name": "JING GUAN LTD",
              "address": "CHINA",
              "contact": {
                "email": "jin@mailinator.com",
                "phone1": "0912-0909",
                "phone2": "0912-0908",
                "wechatId": "UJIOP"
              },
              "note": "觀考得時時行界無最坐：同玩腳！上滿真自高過。老現化學信全、由們爾致了也業高不發跟樂怎見車建要過就一不光密。做河過古新願了利：可大況你就國化例們、教可千！習都水不轉兒題。書而電服算可地具水導會說說外總國受，雖部國手不"
            }
          }
        ]
      };

     const [visible, setVisible] = useState(false);

     const actionShow = () => {
        setVisible(!visible);
     };

     const copyDetailOrder = () => {
    notification.info({
      message: "Copied to Clipboard",
      description:
        "The order detail is copied to the clipboard, use the copied detail to do the purchasing process"
    });
    setTimeout(() => {
      console.log("error");
    }, 6000);

};
const copyEmailAddress = () => {
notification.info({
message: "Copied to Clipboard",
description:
"The email address is copied to the clipboard, use the copied email to do the purchasing process"
});
setTimeout(() => {
console.log("error");
}, 6000);
};

     return (
         <>
            <ModalSupplier
             visible={visible}
             order={order}
             copyDetailOrder={copyDetailOrder}
             copyEmailAddress={copyEmailAddress}
             onOk={actionShow}
             OrderVariant={OrderVariant}
            />
            <Button onClick={actionShow}>Click Me</Button>
         </>
     )

}}
</Playground>

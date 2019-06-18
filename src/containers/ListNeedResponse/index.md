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

## Playground
<Playground>
    <ListNeedResponse data={dataNeedResponse.data} />
</Playground>
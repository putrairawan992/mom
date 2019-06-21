---
name: Text Area
menu: Components
---

import { Playground, Props } from 'docz'
import "antd/dist/antd.css";
import TextArea from './'

# Text Area
This is text area of Monggopesen

## Properties
<Props of={TextArea} />

## Purpose Of Props
```
 Type: 'default' is used for regular text area
 Type: 'error'  is used for error text area
 maxLength : maximum value length in text area
```

## Details
No Details

## Playground

### Text Area (Default)
<Playground>
  <TextArea type="default" placeholder="Type Here" maxLength={200}/>
</Playground>

### Text Area (Error)
<Playground>
  <TextArea type="error" value="example" maxLength={200} />
</Playground>
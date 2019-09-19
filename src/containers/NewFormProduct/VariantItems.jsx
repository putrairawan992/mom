import React from "react";
import { Form, Input ,Row, Col } from "antd";
import {get} from 'lodash';

export default function VariantItems({ item, errors, values, onChange }) {
  const variantItem = `variantItems.${item}`;
  const variantItemName = `${variantItem}.name`;
  return (
    <React.Fragment>
      <Form.Item
        validateStatus={get(errors, variantItemName) ? "error" : "success"}
        help={get(errors, variantItemName)}
      >
        <Input
          value={get(values, variantItemName)}
          name={variantItemName}
          onChange={e => onChange(variantItemName, e.target.value)}
        />
      </Form.Item>
    </React.Fragment>
  );
}

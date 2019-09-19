import React from "react";
import { Form, Input, Button } from "antd";
import {get} from 'lodash';

export default function VariantItems({ item, errors, values, onChange, onRemove }) {
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
        <Button onClick={onRemove}>Remove VariantItems</Button>
      </Form.Item>
    </React.Fragment>
  );
}

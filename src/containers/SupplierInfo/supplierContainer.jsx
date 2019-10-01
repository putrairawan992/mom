import React, { useState } from 'react';
import Supplier from "../../repository/Supplier";
import SupplierInfo from "../../containers/SupplierInfo";

export default function SupplierContainer ({
  values,
  errors, 
  touched,
  onChange,
  grid
}) {
  const [loading, setLoading] = useState(false)
  const [supplierOptions, setSupplierOptions] = useState([])

  async function getSuppliersByKeyword(keyword) {
    setSupplierOptions([]);
    const suppliersResp  = await Supplier.getAll({
      loading: setLoading
    });
    if(suppliersResp.status === 200) {
      const suppliers = suppliersResp.data.data
      const supplierOptions = suppliers.map(supplier =>({
        ...supplier, name : `${supplier.code} - ${supplier.name}`
      }))
      setSupplierOptions(supplierOptions);
    } else {
      setSupplierOptions([]);
    }
  }

  return (
    <SupplierInfo 
      values={values}
      errors={errors}
      touched={touched}
      onChange={onChange}
      grid={grid}
      supplierOptions={supplierOptions}
      loading={loading}
      getSuppliersByKeyword={getSuppliersByKeyword}
    />
  )
}
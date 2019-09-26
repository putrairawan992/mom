import React, { useState } from 'react'
import Supplier from "../../repository/Supplier"

export default function SupplierContainer (props) {
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

  return props.children({
    loading, supplierOptions, getSuppliersByKeyword, values : props.values
  })
}
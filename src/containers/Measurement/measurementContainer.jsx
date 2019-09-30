import React ,{useState, useEffect} from 'react';
import Measurement from "../../containers/Measurement";

export default function MeasurementContainer ({
  values,
  handleBlur,
  touched,
  errors,
  onChange
}){
  const [allMeasurement, setAllMeasurement] = useState({
    actualWeight : '',
    width : '1',
    length: '1',
    height : '1',
    volumetric: '',
    isFragile : false
  })

  useEffect(() => {
    const {width, length, height} = allMeasurement
    let volume = Number(width) * Number(length) * Number(height)
    let volumetricWeight = volume/6000
    let roundVolumetricWeight = Math.round(volumetricWeight * 100) / 100
    if(volume === 1){
      setAllMeasurement({
        ...allMeasurement , volumetric : '0'
      })
    }else{
      setAllMeasurement({
        ...allMeasurement , volumetric : `${roundVolumetricWeight}`
      })
    }
  },[allMeasurement.actualWeight,allMeasurement.width, allMeasurement.length, allMeasurement.volumetric,allMeasurement.height])

  useEffect(() => {
      const volume = values.volumeWeight
      let roundVolumetricWeight = Math.round(volume * 100) / 100
      setAllMeasurement({
        ...allMeasurement , volumetric : `${roundVolumetricWeight}`
      })

  },[values.volumeWeight])

  const handleChange = function (key, value) {
    onChange(key,value)
    setAllMeasurement({
      ...allMeasurement , [key] : value
    })
  }

  return (
    <Measurement 
      values={values}
      handleBlur={handleBlur}
      touched={touched}
      errors={errors}
      onChange={onChange}
      allMeasurement={allMeasurement}
      handleChange={handleChange}
    />
  )
}
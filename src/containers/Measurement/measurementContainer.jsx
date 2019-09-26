import {useState, useEffect} from 'react';

export default function MeasurementContainer (props) {
  const [actualWeight, setActualWeight] = useState("")
  const [width, setWidth] = useState("1")
  const [length, setLength] = useState("1")
  const [height, setHeight] = useState("1")
  const [volumetric, setVolumetric] = useState("")
  const [isFragile, setIsFragile] = useState(false);

  useEffect(() => {
    let volume = Number(width) * Number(length) * Number(height)
    let volumetricWeight = volume/6000
    let roundVolumetricWeight = Math.round(volumetricWeight * 100) / 100
    if(volume === 1){
      setVolumetric("0")
    }else{
      setVolumetric(`${roundVolumetricWeight}`)
    }
  },[actualWeight,width,length,volumetric,height])

  useEffect(() => {
      const volume = props.values.volumeWeight
      let roundVolumetricWeight = Math.round(volume * 100) / 100
      setVolumetric(roundVolumetricWeight)

  },[props.values.volumeWeight])
  return props.children({
    actualWeight, setActualWeight, width, setWidth, length, setLength,
    height, setHeight, volumetric, setVolumetric, isFragile
  })
}
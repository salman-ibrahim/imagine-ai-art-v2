import { Image } from 'react-native'
import React from 'react'

const Base64Image = ({image, style}) => {
  return (
    <Image source={{ uri: `${image}` }} style={style}/>
  )
}

export default Base64Image
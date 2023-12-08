import { View, Text } from 'react-native-ui-lib'
import React, { useEffect, useState } from 'react'
import { getDate, getLocation, getTime } from '../../data/utility'
import { colors, dimensions, styles } from '../../data/styles'
import { Camera, CameraType } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const CameraScreen = () => {
  const [dateAndTimeDisplay, setDateAndTimeDisplay] = useState('')
  const [locationDisplay, setLocationDisplay] = useState('')
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [direction, setDirection] = useState(CameraType.back)
  const [camera, setCamera] = useState(null)
  const [flash, setFlash] = useState(false)
  const [light, setLight] = useState(Camera.Constants.FlashMode.off)
  const [showButtons, setShowButtons] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(0); // Initialize with 0 (no zoom)

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date()
      const date = getDate(newDate)
      const time = getTime(newDate)

      setDateAndTimeDisplay(`${date.date} ${time.time}`)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    getLocation()
      .then(location => {
        setLocationDisplay(`${location.latitude}, ${location.longitude}`)
      })

    setTimeout(() => {
      setShowButtons(true)
      if (!permission) requestPermission()
    }, 1000)
  }, [])


  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 0.015, 1);
    setZoomLevel(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.015, 0);
    setZoomLevel(newZoom);
  };

  const handleFlipCamera = () => {
    setDirection(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  const handleTakeScrap = async () => {
  }


  return (
    <View center>
      <View height='8%' style={{
        justifyContent: 'center',
      }}>
        <Text style={{
          color: colors.text,
          fontFamily: styles.text2,
          fontSize: 24,
        }}>{dateAndTimeDisplay}</Text>
      </View>

      <View height='8%' style={{
        justifyContent: 'center',
      }}>
        <Text style={{
          color: colors.text,
          fontFamily: styles.text2,
          fontSize: 24,
        }}>{locationDisplay}</Text>
      </View>

      <View height='84%'>
        <Camera
          style={{
            width: dimensions.width,
            height: dimensions.width,
          }}
          type={direction}
          ref={(ref) => setCamera(ref)}
          flashMode={light}
          zoom={zoomLevel} // Apply the zoom level
        />

        {permission && permission.granted && showButtons && (
          <View center>
            <TouchableOpacity style={{
              marginBottom: 8,
            }} onPress={() => handleTakeScrap()}>
              <Ionicons name='scan' color={styles.inverse} size={80} />
            </TouchableOpacity>

            <View row>
              <View width='25%' center>
                <TouchableOpacity onPress={handleZoomOut}>
                  <Ionicons name='remove' size={35} />
                </TouchableOpacity>
              </View>

              <View width='25%' center>
                <TouchableOpacity onPress={() => setFlash(!flash)}>
                  {flash && <Ionicons name='flash' color={styles.inverse} size={35} />}
                  {!flash && <Ionicons name='flash-off' color={styles.inverse} size={35} />}
                </TouchableOpacity>
              </View>

              <View width='25%' center>
                <TouchableOpacity onPress={() => handleFlipCamera()}>
                  <Ionicons name='refresh' color={styles.inverse} size={35} />
                </TouchableOpacity>
              </View>

              <View width='25%' center>
                <TouchableOpacity onPress={handleZoomIn}>
                  <Ionicons name='add' color={styles.inverse} size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default CameraScreen
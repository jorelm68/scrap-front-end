import { View, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { getDate, getLocation, getTime } from '../../data/utility'
import { colors, dimensions, styles } from '../../data/styles'
import { Camera, CameraType } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'
import { scrapSaveScrap } from '../../data/api'
import AppContext from '../../context/AppContext'

const CameraScreen = () => {
  const { user } = useContext(AppContext)
  const navigation = useNavigation()
  const [scrap, setScrap] = useState({
    author: user,
  })
  const [dateAndTimeDisplay, setDateAndTimeDisplay] = useState('')
  const [locationDisplay, setLocationDisplay] = useState('')
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [direction, setDirection] = useState(CameraType.back)
  const [camera, setCamera] = useState(null)
  const [flash, setFlash] = useState(false)
  const [light, setLight] = useState(Camera.Constants.FlashMode.off)
  const [zoomLevel, setZoomLevel] = useState(0) // Initialize with 0 (no zoom)
  const [showButtons, setShowButtons] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  console.log(scrap, isSaving)

  const savingHeader = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={async () => {
          setIsLoading(true)
          const response = await scrapSaveScrap(scrap)
          if (!response.success) {
            Alert.alert('Error', response.error)
          }
          setScrap({
            author: user,
            latitude: scrap.latitude,
            longitude: scrap.longitude,
          })
          setIsSaving(false)
          setIsLoading(false)
          setShowButtons(true)
        }}>
          <Ionicons name='checkmark' color={colors.success} size={32} />
        </TouchableOpacity>
      ),
      headerLeft: () => ( // Corrected headerLeft configuration
        <TouchableOpacity onPress={() => {
          setScrap({
            author: user,
            latitude: scrap.latitude,
            longitude: scrap.longitude,
          })
          setIsSaving(false)
          setShowButtons(true)
        }}>
          <Ionicons name='close' color={colors.error} size={32} />
        </TouchableOpacity>
      ), // Don't forget the closing parenthesis for headerLeft
    })
  }
  const cameraHeader = () => {
    navigation.setOptions({
      headerRight: () => { },
      headerLeft: () => { }
    })
  }
  useEffect(() => {
    if (isSaving && !isLoading) {
      savingHeader()
    }
    else {
      cameraHeader()
    }

  }, [isSaving, isLoading, navigation])

  useEffect(() => {
    if (!(!scrap.latitude || !scrap.longitude || !scrap.iPrograph || !scrap.iRetrograph || !scrap.createdAt || !scrap.author || isSaving)) {
      setIsSaving(true)
      setIsLoading(false)
    }
  }, [scrap])

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date()
      const date = getDate(newDate)
      const time = getTime(newDate)

      setDateAndTimeDisplay(`${date.date} ${time.time}`)
      setScrap((prevScrap) => ({
        ...prevScrap,
        createdAt: newDate,
      }))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const processLocation = async () => {
    const location = await getLocation()
    setLocationDisplay(`${location.latitude}, ${location.longitude}`)
    setScrap((prevScrap) => ({
      ...prevScrap,
      latitude: location.latitude,
      longitude: location.longitude,
    }))
  }

  useEffect(() => {
    processLocation()
    setTimeout(() => {
      setShowButtons(true)
      if (!permission) requestPermission()
    }, 1000)
  }, [])

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 0.015, 1)
    setZoomLevel(newZoom)
  }
  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.015, 0)
    setZoomLevel(newZoom)
  }
  const handleFlipCamera = () => {
    setDirection(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  const handleTakeScrap = async () => {
    setShowButtons(false)
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    if (permission && permission.granted) {
      setShowButtons(false)

      if (flash) {
        setLight(Camera.Constants.FlashMode.torch)
      }
      await delay(100)

      let firstPicture = await camera.takePictureAsync()

      handleFlipCamera()
      await delay(1500)

      let secondPicture = await camera.takePictureAsync()

      await delay(100)

      const firstPictureResized = await ImageManipulator.manipulateAsync(
        firstPicture.uri,
        [{ resize: { width: 1080 } }], // resize to width and preserve aspect ratio 
        { compress: 0.7, format: 'jpeg' },
      )
      firstPicture = { uri: firstPictureResized.uri }

      const secondPictureResized = await ImageManipulator.manipulateAsync(
        secondPicture.uri,
        [{ resize: { width: 1080 } }], // resize to width and preserve aspect ratio 
        { compress: 0.7, format: 'jpeg' },
      )
      secondPicture = { uri: secondPictureResized.uri }

      if (direction === CameraType.back) {
        setScrap((prevScrap) => ({
          ...prevScrap,
          iPrograph: firstPicture,
          iRetrograph: secondPicture,
        }))
      }
      else if (direction === CameraType.front) {
        setScrap((prevScrap) => ({
          ...prevScrap,
          iPrograph: secondPicture,
          iRetrograph: firstPicture,
        }))
      }

      handleFlipCamera()
      setIsLoading(true)
      setIsSaving(false)
    }
    else {
      await requestPermission()
    }
  }

  if (isLoading) {
    return (
      <View>
        <Text>LoADING</Text>
      </View>
    )
  }

  return (
    <View>
      {!isSaving && (
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
      )}

      {isSaving && (
        <View>
          <Text>SaveScrap</Text>
        </View>
      )}
    </View>
  )
}

export default CameraScreen
import { View, Image, TouchableOpacity, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { getDate, getLocation, getTime } from '../../data/utility'
import { dimensions, palette, fonts } from '../../data/styles'
import { TouchableWithoutFeedback } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'
import { scrapSaveScrap } from '../../data/api'
import AppContext from '../../context/AppContext'
import DropDownComponent from '../../components/DropDownComponent'
import { regexScrapDescription, regexScrapPlace, regexScrapTitle } from '../../data/regex'
import { errorScrapDescription, errorScrapPlace, errorScrapTitle } from '../../data/error'
import cache from '../../data/cache'

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
  const [reverse, setReverse] = useState(false)

  const processLocation = async () => {
    const location = await getLocation()
    setLocationDisplay(`${location.latitude}, ${location.longitude}`)
    setScrap((prevScrap) => ({
      ...prevScrap,
      latitude: location.latitude,
      longitude: location.longitude,
    }))
  }
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
  const handleToggleDirection = async () => {
    setReverse(!reverse)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date()

      setDateAndTimeDisplay(getDate(newDate))
      setScrap((prevScrap) => ({
        ...prevScrap,
        createdAt: newDate,
      }))
    }, 1000)

    processLocation()
    setTimeout(() => {
      setShowButtons(true)
      if (!permission) requestPermission()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    if (isSaving && !isLoading) {
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
            cache.filter([user, 'scraps'])
            setIsSaving(false)
            setIsLoading(false)
            setShowButtons(true)
          }}>
            <Ionicons name='checkmark' color={palette.secondary14} size={24} />
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
            <Ionicons name='close' color={palette.complement2} size={24} />
          </TouchableOpacity>
        ), // Don't forget the closing parenthesis for headerLeft
      })
    }
    else {
      navigation.setOptions({
        headerRight: () => { },
        headerLeft: () => { }
      })
    }

  }, [isSaving, isLoading, navigation, scrap])
  useEffect(() => {
    if (!(!scrap.latitude || !scrap.longitude || !scrap.iPrograph || !scrap.iRetrograph || !scrap.createdAt || !scrap.author || isSaving)) {
      setIsSaving(true)
      setIsLoading(false)
    }
  }, [scrap])

  if (isLoading) {
    return (
      <View style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: palette.secondary11,
      }}>
        <Text>LoADING</Text>
      </View>
    )
  }

  return (
    <View style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.secondary11,
    }}>
      {!isSaving && (
        <View center>
          <View height='8%' style={{
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: fonts.jockeyOne,
              fontSize: 24,
              color: palette.secondary14,
            }}>{dateAndTimeDisplay}</Text>
          </View>

          <View height='8%' style={{
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: fonts.jockeyOne,
              fontSize: 24,
              color: palette.secondary14,
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
                  <Ionicons name='scan' color={palette.complement4} size={80} />
                </TouchableOpacity>

                <View row>
                  <View width='25%' center>
                    <TouchableOpacity onPress={handleZoomOut}>
                      <Ionicons name='remove' color={palette.complement4} size={35} />
                    </TouchableOpacity>
                  </View>

                  <View width='25%' center>
                    <TouchableOpacity onPress={() => setFlash(!flash)}>
                      {flash && <Ionicons name='flash' color={palette.complement4} size={35} />}
                      {!flash && <Ionicons name='flash-off' color={palette.complement4} size={35} />}
                    </TouchableOpacity>
                  </View>

                  <View width='25%' center>
                    <TouchableOpacity onPress={() => handleFlipCamera()}>
                      <Ionicons name='refresh' color={palette.complement4} size={35} />
                    </TouchableOpacity>
                  </View>

                  <View width='25%' center>
                    <TouchableOpacity onPress={handleZoomIn}>
                      <Ionicons name='add' color={palette.complement4} size={35} />
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
          <DropDownComponent
            type='Text'
            title='Title:'
            value={scrap.title}
            boxes={[
              {
                placeholder: 'New Title',
                regex: regexScrapTitle,
                error: errorScrapTitle,
                autoCorrect: true,
                autoCapitalize: 'words',
              }
            ]}
            onSubmit={(values) => {
              setScrap((prevScrap) => ({
                ...prevScrap,
                title: values[0],
              }))

              return {
                success: true,
              }
            }}
          />
          <DropDownComponent
            type='Text'
            title='Description:'
            value={scrap.description}
            boxes={[
              {
                placeholder: 'New Description',
                regex: regexScrapDescription,
                error: errorScrapDescription,
                autoCorrect: true,
                autoCapitalize: 'sentences',
              }
            ]}
            onSubmit={(values) => {
              setScrap((prevScrap) => ({
                ...prevScrap,
                description: values[0],
              }))

              return {
                success: true,
              }
            }}
          />
          <DropDownComponent
            type='Text'
            title='Place:'
            value={scrap.place}
            boxes={[
              {
                placeholder: 'New Place',
                regex: regexScrapPlace,
                error: errorScrapPlace,
                autoCorrect: true,
                autoCapitalize: 'words',
              }
            ]}
            onSubmit={(values) => {
              setScrap((prevScrap) => ({
                ...prevScrap,
                place: values[0],
              }))

              return {
                success: true,
              }
            }}
          />

          <TouchableWithoutFeedback onPress={handleToggleDirection}>
            <View>
              <Image source={reverse ? scrap.iRetrograph : scrap.iPrograph} style={{
                width: dimensions.width,
                height: dimensions.width,
                borderRadius: 8,
              }} />

              <Image source={reverse ? scrap.iPrograph : scrap.iRetrograph} style={{
                position: 'absolute',
                width: dimensions.width / 3,
                height: dimensions.width / 3,
                borderRadius: 8,
                right: 0,
              }} />
            </View>
          </TouchableWithoutFeedback>

        </View>
      )}
    </View>
  )
}

export default CameraScreen
import { View, Image, TouchableOpacity, Text } from 'react-native-ui-lib'
import React, { useContext, useEffect, useState } from 'react'
import { getDate, getLocation, getTime } from '../../data/utility'
import { dimensions, palette, fonts } from '../../data/styles'
import { ActivityIndicator, TouchableWithoutFeedback, ScrollView } from 'react-native'
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
import LogoComponent from '../../components/LogoComponent'

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
      setLight(Camera.Constants.FlashMode.off)
      setIsLoading(true)
      setIsSaving(false)
    }
    else {
      await requestPermission()
    }
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
    if (!(!scrap.latitude || !scrap.longitude || !scrap.iPrograph || !scrap.iRetrograph || !scrap.createdAt || !scrap.author || isSaving)) {
      setIsSaving(true)
      setIsLoading(false)
    }
  }, [scrap])

  if (isLoading) {
    return (
      <View flex center style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: palette.primary0,
      }}>
        <LogoComponent />
        <ActivityIndicator size='large' color={palette.primary4} />
      </View>
    )
  }

  return (
    <View style={{
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: palette.primary0,
    }}>
      {!isSaving && (
        <View center>
          <View height='8%' style={{
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: fonts.jockeyOne,
              fontSize: 24,
              color: palette.primary4,
            }}>{dateAndTimeDisplay}</Text>
          </View>

          <View height='8%' style={{
            justifyContent: 'center',
          }}>
            <Text style={{
              fontFamily: fonts.jockeyOne,
              fontSize: 24,
              color: palette.primary4,
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
                    <TouchableOpacity onPress={() => {
                      const newZoom = Math.max(zoomLevel - 0.015, 0)
                      setZoomLevel(newZoom)
                    }}>
                      <Ionicons name='remove' color={palette.complement4} size={35} />
                    </TouchableOpacity>
                  </View>

                  <View width='25%' center>
                    <TouchableOpacity onPress={() => {
                      setFlash(!flash)
                    }}>
                      {flash && <Ionicons name='flash' color={palette.complement4} size={35} />}
                      {!flash && <Ionicons name='flash-off' color={palette.complement4} size={35} />}
                    </TouchableOpacity>
                  </View>

                  <View width='25%' center>
                    <TouchableOpacity onPress={handleFlipCamera}>
                      <Ionicons name='refresh' color={palette.complement4} size={35} />
                    </TouchableOpacity>
                  </View>

                  <View width='25%' center>
                    <TouchableOpacity onPress={() => {
                      const newZoom = Math.min(zoomLevel + 0.015, 1)
                      setZoomLevel(newZoom)
                    }}>
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
        <ScrollView keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true}>
          <View centerH row style={{
            width: dimensions.width,
            height: 48 + 20,
            marginVertical: 16,
          }}>
            <TouchableOpacity onPress={async () => {
              setScrap({
                author: user,
                latitude: scrap.latitude,
                longitude: scrap.longitude,
              })
              setIsSaving(false)
              setShowButtons(true)
            }}>
              <View center style={{
                width: dimensions.width / 2,
                height: 48,
              }}>
                <Ionicons name='close-circle' color={palette.complement4} size={48} />
              </View>

              <View center>
                <Text style={{
                  fontFamily: fonts.itim,
                  fontSize: 18,
                  color: palette.complement4,
                }}>Retake</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => {
              setIsLoading(true)
              const response = await scrapSaveScrap(scrap)
              if (!response.success) {
                Alert.alert('Error', response.error)
              }
              else {
                setScrap({
                  author: user,
                  latitude: scrap.latitude,
                  longitude: scrap.longitude,
                })
                cache.filter([user, 'miles'])
                cache.filter([user, 'scraps'])
                cache.filter([user, 'publicScraps'])
                cache.filter([user, 'unbookedScraps'])
                setIsSaving(false)
                setIsLoading(false)
                setShowButtons(true)
              }
            }}>
              <View center style={{
                width: dimensions.width / 2,
                height: 48,
              }}>
                <Ionicons name='checkmark-circle' color={palette.complement4} size={48} />
              </View>

              <View center>
                <Text style={{
                  fontFamily: fonts.itim,
                  fontSize: 18,
                  color: palette.complement4,
                }}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>

          <DropDownComponent
            type='Text'
            title='Title:'
            topBorder
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

          <View height={16} />

          <TouchableWithoutFeedback onPress={() => {
            setReverse(!reverse)
          }}>
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

          <View height={200} />
        </ScrollView>
      )}
    </View>
  )
}

export default CameraScreen
// /app/(tabs)/feed/index.js

import { Stack, useNavigation, useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native-ui-lib";
import Feed from '../../../screens/Feed'
import { useContext, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'
import useAuthor from "../../../hooks/useAuthor";
import AppContext from "../../../context/AppContext";
import { fonts } from "../../../data/styles";

export default function Page() {
  const navigation = useNavigation()
  const router = useRouter()
  const { palette, user } = useContext(AppContext)

  const {
    actions,
  } = useAuthor(user, [
    'actions'
  ])

  let numUnread = 0
  for (const action of actions) {
    if (!action.read) {
      numUnread++
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => {
            router.navigate('/feed/actions')
          }}>
            <View row center>
              <Text style={{
                fontFamily: fonts.playBold,
                fontSize: 12,
                color: numUnread > 0 ? 'red' : palette.color6,
              }}>{numUnread > 0 ? numUnread : ''}</Text>
              <Ionicons name='notifications' size={24} color={numUnread > 0 ? 'red' : palette.color6} />
            </View>
          </TouchableOpacity>
        )
      }
    })
  }, [navigation, actions])

  return (
    <Feed />
  )
}
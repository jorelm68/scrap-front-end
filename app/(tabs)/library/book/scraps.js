import { useLocalSearchParams } from 'expo-router'
import Screen from '../../../../screens/Scraps'

const Page = () => {
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)

  return <Screen scraps={scraps} />
}

export default Page
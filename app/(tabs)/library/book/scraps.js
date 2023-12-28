import { useLocalSearchParams } from 'expo-router'
import Scraps from '../../../../screens/Scraps'

const Page = () => {
  const params = useLocalSearchParams()
  const scraps = JSON.parse(params.scraps)

  return <Scraps scraps={scraps} />
}

export default Page
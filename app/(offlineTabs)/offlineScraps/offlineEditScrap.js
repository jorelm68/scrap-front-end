import { useLocalSearchParams } from 'expo-router'
import OfflineEditScrap from '../../../screens/OfflineEditScrap'

const Page = () => {
    const { index: indexRaw } = useLocalSearchParams()
    const index = JSON.parse(indexRaw)

    return <OfflineEditScrap index={index} />
}

export default Page
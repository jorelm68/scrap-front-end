import { useLocalSearchParams } from 'expo-router'
import EditScrap from '../../../../screens/EditScrap'

const Page = () => {
    const { scrap } = useLocalSearchParams()

    return (
        <EditScrap scrap={scrap} />
    )
}

export default Page
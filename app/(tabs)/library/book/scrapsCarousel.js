import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native-ui-lib'
import ScrapsCarousel from '../../../../screens/ScrapsCarousel'

const Page = () => {
    const params = useLocalSearchParams()
    const scraps = JSON.parse(params.scraps)
    const page = JSON.parse(params.page)

    return <ScrapsCarousel scraps={scraps} page={page} />

}

export default Page
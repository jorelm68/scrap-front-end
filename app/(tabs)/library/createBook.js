import { useLocalSearchParams } from 'expo-router'
import Screen from '../../../screens/CreateBook'

const Page = () => {
    const params = useLocalSearchParams()
    

    return (
        <Screen />
    )
}

export default Page
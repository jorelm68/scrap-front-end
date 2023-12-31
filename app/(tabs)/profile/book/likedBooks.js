import { useLocalSearchParams } from 'expo-router'
import LikedBooks from '../../../../screens/LikedBooks'

const Page = () => {
    const { author } = useLocalSearchParams()
    
    return <LikedBooks author={author} />
}

export default Page
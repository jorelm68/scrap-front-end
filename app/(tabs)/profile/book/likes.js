import { useLocalSearchParams } from 'expo-router'
import Likes from '../../../../screens/Likes'

const Page = () => {
    const params = useLocalSearchParams()
    const book = params.book

    return (
        <Likes book={book} />
    )
}

export default Page
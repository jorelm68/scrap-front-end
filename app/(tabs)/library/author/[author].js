import { useLocalSearchParams } from 'expo-router'
import Author from '../../../../screens/Author'

const Page = () => {
    const { author } = useLocalSearchParams()

    return <Author author={author} />
}

export default Page
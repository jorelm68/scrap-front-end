import { useLocalSearchParams } from 'expo-router'
import EditBook from '../../../../screens/EditBook'

const Page = () => {
    const params = useLocalSearchParams()
    const book = params.book
        
    return <EditBook book={book} />
}

export default Page
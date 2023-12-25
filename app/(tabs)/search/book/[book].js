import { useLocalSearchParams } from 'expo-router'
import Book from '../../../../screens/Book'

const Page = () => {
    const params = useLocalSearchParams()
    const book = params.book
    const scraps = params.scraps ? JSON.parse(params.scraps) : []
    const page = params.page ? JSON.parse(params.page) : 0

    return (
        <Book book={book} scraps={scraps} page={page} />
    )
}

export default Page
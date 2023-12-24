import { useLocalSearchParams } from 'expo-router'
import FindBooks from '../../../../screens/FindBooks'

const Page = () => {
    const params = useLocalSearchParams()
    const book = params.book
    const threads = JSON.parse(params.threads)
    const amount = JSON.parse(params.amount)
    const functionName = params.functionName

    return (
        <FindBooks book={book} />
    )
}

export default Page
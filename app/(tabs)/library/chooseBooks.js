import { useLocalSearchParams } from 'expo-router'
import ChooseBooks from '../../../screens/ChooseBooks'

const Page = () => {
    const params = useLocalSearchParams()
    const books = JSON.parse(params.books)
    const amount = JSON.parse(params.amount)
    const functionName = params.functionName

    return <ChooseBooks books={books} amount={amount} functionName={functionName} />
}

export default Page
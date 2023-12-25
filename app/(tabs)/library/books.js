import { useLocalSearchParams } from 'expo-router'
import Books from '../../../screens/Books'

const Page = () => {
  const params = useLocalSearchParams()
  const books = JSON.parse(params.books)

  return <Books books={books} />
}

export default Page
import { useLocalSearchParams } from 'expo-router'
import ChooseScraps from '../../../screens/ChooseScraps'

const Page = () => {
    const params = useLocalSearchParams()
    const scraps = JSON.parse(params.scraps)
    const amount = JSON.parse(params.amount)
    const functionName = params.functionName

    return <ChooseScraps scraps={scraps} amount={amount} functionName={functionName} />
}

export default Page
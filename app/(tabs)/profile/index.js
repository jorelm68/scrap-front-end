// /app/(tabs)/profile/index.js

import { useContext } from "react"
import AppContext from '../../../context/AppContext'
import Author from '../../../screens/Author'

const Page = () => {
  const { user } = useContext(AppContext)

  return <Author author={user} />
}
export default Page
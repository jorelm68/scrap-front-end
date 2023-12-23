import React, { useState, useEffect } from 'react'
import AppContext from './AppContext'
import cache from '../data/cache'

const AppContextProvider = ({ children }) => {
    // Define the shared variables and their initial values here
    const [user, setUser] = useState('bruh')
    const [accounts, setAccounts] = useState([])
    const [authenticated, setAuthenticated] = useState(false)
    const [functions, setFunctions] = useState({})
    const [currentScrap, setCurrentScrap] = useState('')

    useEffect(() => {
        cache.filter(['relationship'])
    }, [user])

    // You can also define functions or any other data that you want to share

    // Create an object with the shared variables and functions to be passed as the value
    const sharedValues = {
        user,
        setUser,
        accounts,
        setAccounts,
        authenticated,
        setAuthenticated,
        functions,
        setFunctions,
        currentScrap,
        setCurrentScrap,
        // ... other shared data and functions
    }

    return <AppContext.Provider value={sharedValues}>{children}</AppContext.Provider>
}

export default AppContextProvider
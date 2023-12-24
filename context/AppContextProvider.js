import React, { useState, useEffect } from 'react'
import AppContext from './AppContext'
import cache from '../data/cache'

const AppContextProvider = ({ children }) => {
    // Define the shared variables and their initial values here
    const [user, setUser] = useState('bruh')
    const [darkMode, setDarkMode] = useState(true)
    const [palette, setPalette] = useState({})
    const [accounts, setAccounts] = useState([])
    const [paused, setPaused] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [functions, setFunctions] = useState({})
    const [currentScrap, setCurrentScrap] = useState('')
    const [tab, setTab] = useState('')

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
        palette,
        setPalette,
        darkMode,
        setDarkMode,
        functions,
        setFunctions,
        paused,
        setPaused,
        currentScrap,
        setCurrentScrap,
        tab,
        setTab,
        // ... other shared data and functions
    }

    return <AppContext.Provider value={sharedValues}>{children}</AppContext.Provider>
}

export default AppContextProvider
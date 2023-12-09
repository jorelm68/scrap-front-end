import React, { useState, useEffect } from 'react'
import AppContext from './AppContext'

const AppContextProvider = ({ children }) => {
    // Define the shared variables and their initial values here
    const [user, setUser] = useState('bruh')
    const [scrap, setScrap] = useState({})
    const [accounts, setAccounts] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [offline, setOffline] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        setScrap((prevScrap) => ({
            ...prevScrap,
            author: user,
        }))
    }, [user])

    // You can also define functions or any other data that you want to share
    
    // Create an object with the shared variables and functions to be passed as the value
    const sharedValues = {
        user,
        setUser,
        scrap,
        setScrap,
        accounts,
        setAccounts,
        isSaving,
        setIsSaving,
        offline,
        setOffline,
        authenticated,
        setAuthenticated,
        showButtons,
        setShowButtons,
        // ... other shared data and functions
    }

    return <AppContext.Provider value={sharedValues}>{children}</AppContext.Provider>
}

export default AppContextProvider
import React, { useState, useEffect } from 'react'
import AppContext from './AppContext'

const AppContextProvider = ({ children }) => {
    // Define the shared variables and their initial values here
    const [user, setUser] = useState('bruh')
    const [newScrap, setNewScrap] = useState({})
    const [newBook, setNewBook] = useState({})
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [offline, setOffline] = useState(true)
    const [accounts, setAccounts] = useState([])
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    // You can also define functions or any other data that you want to share
    
    // Create an object with the shared variables and functions to be passed as the value
    const sharedValues = {
        user,
        setUser,
        newScrap,
        setNewScrap,
        newBook,
        setNewBook,
        loading,
        setLoading,
        authenticated,
        setAuthenticated,
        offline,
        setOffline,
        accounts,
        setAccounts,
        query,
        setQuery,
        results,
        setResults,
        // ... other shared data and functions
    }

    return <AppContext.Provider value={sharedValues}>{children}</AppContext.Provider>
}

export default AppContextProvider
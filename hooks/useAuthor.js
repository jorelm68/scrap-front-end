import { useState, useEffect, useContext } from 'react'
import AppContext from '../context/AppContext'
import cache from '../data/cache'
import utility from '../data/utility'
import { defaultHeadshot, defaultCover } from '../data/icons'
import { router } from 'expo-router'

export default function useAuthor(author, requests) {
    const { user } = useContext(AppContext)

    if (user === 'author') {
        // sign out
        utility.deleteData('autothenticate')
        cache.filter(['relationship'])
        cache.filter(['profileBooks'])
        while (router.canGoBack()) {
            router.back()
        }
        router.replace('/authentication/signIn')
    }

    const [headshot, setHeadshot] = useState('')
    const [cover, setCover] = useState('')
    const [iHeadshot, setIHeadshot] = useState(defaultHeadshot)
    const [iCover, setICover] = useState(defaultCover)
    const [headshotAndCover, setHeadshotAndCover] = useState('')
    const [autobiography, setAutobiography] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [pseudonym, setPseudonym] = useState('')
    const [email, setEmail] = useState('')
    const [pushToken, setPushToken] = useState(undefined)
    const [publicBooks, setPublicBooks] = useState([])
    const [profileBooks, setProfileBooks] = useState([])
    const [unbookedScraps, setUnbookedScraps] = useState([])
    const [miles, setMiles] = useState(0)

    const [relationship, setRelationship] = useState('')
    const [friends, setFriends] = useState([])
    const [incomingFriendRequests, setIncomingFriendRequests] = useState([])
    const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([])

    const [scraps, setScraps] = useState([])

    const [books, setBooks] = useState([])

    const [likedScraps, setLikedScraps] = useState([])
    const [likedBooks, setLikedBooks] = useState([])

    const [feed, setFeed] = useState([])
    const [actions, setActions] = useState([])
    const [activated, setActivated] = useState(false)
    const [advertisements, setAdvertisements] = useState(true)

    const get = async (model, id, key, setResponse = () => { }, handleError = () => { }) => {
        if (!model || !id || !key || !setResponse) return undefined
        try {
            let response = null
            response = await cache.get(model, id, key, user)
            setResponse(response)
        } catch (error) {
            handleError()
        }
    }

    const processRequest = async (request, promises) => {
        let set = (blank) => { console.log('blank setter: ', blank) }

        if (request === 'headshot') set = setHeadshot
        else if (request === 'cover') set = setCover
        else if (request === 'headshotAndCover') set = setHeadshotAndCover
        else if (request === 'autobiography') set = setAutobiography
        else if (request === 'firstName') set = setFirstName
        else if (request === 'lastName') set = setLastName
        else if (request === 'pseudonym') set = setPseudonym
        else if (request === 'email') set = setEmail
        else if (request === 'miles') set = setMiles
        else if (request === 'pushToken') set = setPushToken
        else if (request === 'profileBooks') set = setProfileBooks
        else if (request === 'relationship') set = setRelationship
        else if (request === 'friends') set = setFriends
        else if (request === 'incomingFriendRequests') set = setIncomingFriendRequests
        else if (request === 'outgoingFriendRequests') set = setOutgoingFriendRequests
        else if (request === 'scraps') set = setScraps
        else if (request === 'books') set = setBooks
        else if (request === 'likedScraps') set = setLikedScraps
        else if (request === 'likedBooks') set = setLikedBooks
        else if (request === 'feed') set = setFeed
        else if (request === 'actions') set = setActions
        else if (request === 'publicBooks') set = setPublicBooks
        else if (request === 'unbookedScraps') set = setUnbookedScraps
        else if (request === 'activated') set = setActivated
        else if (request === 'advertisements') set = setAdvertisements

        if (author !== undefined && author !== '') {
            if (request.includes('iHeadshot')) {
                try {
                    const scrap = await cache.get('Author', author, 'headshotAndCover', user)
                    const retrograph = await cache.get('Scrap', scrap, 'retrograph', user)
                    const iHeadshot = await cache.getPhoto(retrograph, request.split('->')[1])
                    setIHeadshot(iHeadshot)
                } catch (error) {
                    setIHeadshot(defaultHeadshot)
                }
            }
            else if (request.includes('iCover')) {
                try {
                    const scrap = await cache.get('Author', author, 'headshotAndCover', user)
                    const prograph = await cache.get('Scrap', scrap, 'prograph', user)
                    const iCover = await cache.getPhoto(prograph, request.split('->')[1])
                    setICover(iCover)
                } catch (error) {
                    setICover(defaultCover)
                }
            }
            else {
                promises.push(get('Author', author, request, set))
            }
        }
    }

    useEffect(() => {
        const promises = []
        requests.forEach(request => {
            processRequest(request, promises)
        })

        Promise.all(promises)
    }, [author, requests])

    const [showName, setShowName] = useState(true)
    const toggleName = () => {
        setShowName(!showName)
    }

    return {
        headshot,
        setHeadshot,
        cover,
        setCover,
        headshotAndCover,
        setHeadshotAndCover,
        iHeadshot,
        setIHeadshot,
        iCover,
        setICover,
        autobiography,
        setAutobiography,
        firstName,
        setFirstName,
        profileBooks,
        setProfileBooks,
        activated,
        setActivated,
        advertisements,
        setAdvertisements,
        lastName,
        setLastName,
        pseudonym,
        setPseudonym,
        email,
        setEmail,
        relationship,
        setRelationship,
        friends,
        setFriends,
        incomingFriendRequests,
        setIncomingFriendRequests,
        outgoingFriendRequests,
        setOutgoingFriendRequests,
        scraps,
        setScraps,
        books,
        setBooks,
        likedScraps,
        setLikedScraps,
        likedBooks,
        setLikedBooks,
        feed,
        setFeed,
        pushToken,
        setPushToken,
        actions,
        setActions,
        publicBooks,
        setPublicBooks,
        unbookedScraps,
        setUnbookedScraps,
        miles,
        setMiles,
        showName,
        toggleName,
    }
}
import { useEffect, useState, useContext } from 'react'
import AppContext from '../context/AppContext'
import { defaultImage, defaultHeadshot } from '../data/icons'
import Cache from '../data/cache'

export default function useScrap(scrap, requests) {
    const { user } = useContext(AppContext)
    const [isCanceled, setIsCanceled] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [threads, setThreads] = useState('')
    const [book, setBook] = useState('')

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [place, setPlace] = useState('')
    const [createdAt, setCreatedAt] = useState('')

    const [prograph, setPrograph] = useState('')
    const [retrograph, setRetrograph] = useState('')
    const [iPrograph, setIPrograph] = useState(defaultImage)
    const [iRetrograph, setIRetrograph] = useState(defaultHeadshot)

    const get = async (modelName, identifier, field, setResponse = () => { }, handleError = () => { }) => {
        if (modelName === undefined || identifier === undefined || field === undefined || setResponse === undefined) {
            return undefined
        }
        try {
            let response = null
            if (!isCanceled) response = await Cache.get(modelName, identifier, field, user)
            if (!isCanceled) setResponse(response)
        } catch (error) {
            if (!isCanceled) handleError()
        }
    }

    const processRequest = async (request, promises) => {
        let set = (blank) => { console.log('blank setter: ', blank) }

        if (request === 'retrograph') set = setRetrograph
        else if (request === 'prograph') set = setPrograph
        else if (request === 'book') set = setBook
        else if (request === 'title') set = setTitle
        else if (request === 'description') set = setDescription
        else if (request === 'author') set = setAuthor
        else if (request === 'latitude') set = setLatitude
        else if (request === 'longitude') set = setLongitude
        else if (request === 'place') set = setPlace
        else if (request === 'threads') set = setThreads
        else if (request === 'createdAt') set = setCreatedAt

        if (scrap !== undefined && scrap !== '') {
            if (request.includes('iRetrograph')) {
                try {
                    const retrograph = await Cache.get('Scrap', scrap, 'retrograph', user)
                    const iRetrograph = await Cache.getPhoto(retrograph, request.split('->')[1])
                    setIRetrograph(iRetrograph)
                } catch (error) {
                    setIRetrograph(defaultHeadshot)
                }
            }
            else if (request.includes('iPrograph')) {
                try {
                    const prograph = await Cache.get('Scrap', scrap, 'prograph', user)
                    const iPrograph = await Cache.getPhoto(prograph, request.split('->')[1])
                    setIPrograph(iPrograph)
                } catch (error) {
                    setIPrograph(defaultImage)
                }
            }
            else {
                promises.push(get('Scrap', scrap, request, set))
            }
        }
    }

    useEffect(() => {
        const primary = []
        requests.forEach(request => {
            processRequest(request, primary)
        })

        Promise.all(primary)
    }, [scrap, requests])

    useEffect(() => {
        return () => {
            setIsCanceled(true)
        }
    }, [])

    const [graph, setGraph] = useState('prograph')
    const toggleGraph = () => {
        if (graph === 'ambigraph') setGraph('prograph')
        else if (graph === 'prograph') setGraph('retrograph')
        else if (graph === 'retrograph') setGraph('ambigraph')
    }

    const [direction, setDirection] = useState(true)
    const toggleDirection = () => {
        setDirection(!direction)
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        author,
        setAuthor,
        place,
        setPlace,
        threads,
        setThreads,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        book,
        setBook,
        prograph: direction ? prograph : retrograph,
        setPrograph: direction ? setPrograph : setRetrograph,
        retrograph: direction ? retrograph : prograph,
        setRetrograph: direction ? setRetrograph : setPrograph,
        iPrograph: direction ? iPrograph : iRetrograph,
        setIPrograph: direction ? setIPrograph : setIRetrograph,
        iRetrograph: direction ? iRetrograph : iPrograph,
        setIRetrograph: direction ? setIRetrograph : setIPrograph,
        createdAt,
        setCreatedAt,
        graph,
        direction,
        toggleGraph,
        toggleDirection,
    }
}
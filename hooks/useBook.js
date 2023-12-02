import { useEffect, useState, useContext } from 'react'
import AppContext from '../context/AppContext'
import { defaultImage } from '../data/icons'
import Cache from '../data/cache'
import { bookRemoveLike, bookAddLike } from '../data/api'
import { showAlert } from '../data/utility'

export default function useBook(book, requests) {
    const { user } = useContext(AppContext)

    const [cover, setCover] = useState('')
    const [iCover, setICover] = useState(defaultImage)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [author, setAuthor] = useState('')
    const [threads, setThreads] = useState('')
    const [scraps, setScraps] = useState([])
    const [likes, setLikes] = useState([])

    const get = async (modelName, identifier, field, setResponse = () => { }, handleError = () => { }) => {
        if (!modelName || !identifier || !field || !setResponse) return undefined
        try {
            let response = null
            response = await Cache.get(modelName, identifier, field, user)
            setResponse(response)
        } catch (error) {
            handleError()
        }
    }

    const processRequest = (request, promises) => {
        let set = (blank) => { console.log('blank setter: ', blank)}
        
        if (request.includes('iCover')) set = setICover
        else if (request === 'cover') set = setCover
        else if (request === 'title') set = setTitle
        else if ( request === 'description') set = setDescription
        else if (request === 'privacy') set = setPrivacy
        else if (request === 'author') set = setAuthor
        else if (request === 'scraps') set = setScraps
        else if (request === 'threads') set = setThreads
        else if (request === 'likes') set = setLikes

        promises.push(get('Book', book, request, set))
    }

    useEffect(() => {
        const primary = []
        requests.forEach(request => {
            processRequest(request, primary)
        })

        Promise.all(primary)
    }, [book, requests])

    useEffect(() => {
        return () => {
            setIsCanceled(true)
        }
    }, [])

    const [isPaused, setIsPaused] = useState(false)
    const toggleLike = async () => {
        if (isPaused) return
        if (likes.includes(user)) {
            setIsPaused(true)

            try {
                const response = await bookRemoveLike(book, user)
                if (!response.success) throw new Error(response.error)

                Cache.filter([book, 'likes'])
                Cache.filter([user, 'likedBooks'])
            } catch (error) {
                showAlert('Error', error.message)
            }

            setIsPaused(false)
        } else {
            setIsPaused(true)

            try {
                const response = await bookAddLike(book, user)
                if (!response.success) throw new Error(response.error)

                Cache.filter([book, 'likes'])
                Cache.filter([user, 'likedBooks'])
            } catch (error) {
                showAlert('Error', error.message)
            }

            setLikes([...likes, user])
            setIsPaused(false)
        }
    }

    return {
        cover,
        iCover,
        title,
        description,
        privacy,
        author,
        scraps,
        threads,
        likes,
        toggleLike,
        isPaused,
        mode,
    }
}
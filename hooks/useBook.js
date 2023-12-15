import { useEffect, useState, useContext } from 'react'
import AppContext from '../context/AppContext'
import { defaultImage } from '../data/icons'
import { bookRemoveLike, bookAddLike } from '../data/api'
import { showAlert } from '../data/utility'
import Cache from '../data/cache'

export default function useBook(book, requests) {
    const { user } = useContext(AppContext)
    const [isCanceled, setIsCanceled] = useState(false)

    const [representative, setRepresentative] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [author, setAuthor] = useState('')
    const [threads, setThreads] = useState('')
    const [scraps, setScraps] = useState([])
    const [likes, setLikes] = useState([])

    const get = async (modelName, identifier, field, setResponse = () => { }, handleError = () => { }) => {
        if (!modelName || !identifier || !field || !setResponse) return undefined
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

        if (request === 'representative') set = setRepresentative
        else if (request === 'title') set = setTitle
        else if (request === 'description') set = setDescription
        else if (request === 'isPublic') set = setIsPublic
        else if (request === 'author') set = setAuthor
        else if (request === 'scraps') set = setScraps
        else if (request === 'threads') set = setThreads
        else if (request === 'likes') set = setLikes

        if (book !== undefined) {
            promises.push(get('Book', book, request, set))
        }
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
        representative,
        setRepresentative,
        title,
        setTitle,
        description,
        setDescription,
        isPublic,
        setIsPublic,
        author,
        setAuthor,
        scraps,
        setScraps,
        threads,
        setThreads,
        likes,
        setLikes,
        toggleLike,
        isPaused,
    }
}
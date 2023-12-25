import { useState, useEffect, useContext } from 'react'
import AppContext from '../context/AppContext'
import cache from '../data/cache'

export default function useAction(action, requests) {
    const { user } = useContext(AppContext)

    const [sender, setSender] = useState({})
    const [target, setTarget] = useState({})
    const [read, setRead] = useState(true)
    const [createdAt, setCreatedAt] = useState(new Date())
    const [type, setType] = useState('')

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

        if (request === 'sender') set = setSender
        else if (request === 'target') set = setTarget
        else if (request === 'read') set = setRead
        else if (request === 'createdAt') set = setCreatedAt
        else if (request === 'type') set = setType

        promises.push(get('Action', action, request, set))
    }

    useEffect(() => {
        const promises = []
        requests.forEach(request => {
            processRequest(request, promises)
        })

        Promise.all(promises)
    }, [action, requests])

    return {
        sender,
        setSender,
        target,
        setTarget,
        read,
        setRead,
        createdAt,
        setCreatedAt,
        type,
        setType,
    }
}
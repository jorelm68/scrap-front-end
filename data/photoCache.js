import { CAPACITY } from '@env'
import {
    utilityGetPhoto,
} from './api'

// <><><><><><><><><><CANCELLATION TOKEN><><><><><><><><><><><><><>
class CancellationToken {
    constructor() {
        this.isCancelled = false
        this.cancelHandlers = []
    }

    cancel() {
        this.isCancelled = true
        this.invokeCancelHandlers()
    }

    registerCancelHandler(handler) {
        this.cancelHandlers.push(handler)
    }

    invokeCancelHandlers() {
        for (const handler of this.cancelHandlers) {
            handler()
        }
    }
}
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

class Cache {
    constructor() {
        if (Cache.instance) {
            return Cache.instance // Return the existing instance if it already exists
        }

        this.cache = new Map() // Map to store cached data
        this.requests = {} // Object to store ongoing requests
        this.putLocks = new Map() // Map to store cancellation tokens for PUT requests

        Cache.instance = this // Save the instance to a static property
    }

    // Retrieve data from cache or fetch from backend if not available
    async get(photo) {
        if (this.cache.has(photo)) {
            // Cache hit - Move the key to the end to mark it as most recently used
            const value = this.cache.get(photo)
            this.cache.delete(photo)
            this.cache.set(photo, value)
            return value
        } else {
            if (this.requests[photo]) {
                // Cache miss but ongoing request for the same data - return the promise
                return this.requests[photo]
            }

            // Cache miss and no ongoing request - create a new promise for data retrieval
            const fetch = new Promise(async (resolve, reject) => {
                try {
                    // Fetch data from the backend
                    const response = await utilityGetPhoto(photo)

                    if (response.success) {
                        const data = response.data[field]
                        // Cache the retrieved data and resolve the promise with it
                        this.put(photo, data)
                        resolve(data)
                    } else {
                        // Reject the promise with the error message
                        reject(new Error(response.error))
                    }
                } catch (error) {
                    // Reject the promise with any other error that occurred
                    reject(error)
                }

                // Remove the request from requests once resolved or rejected
                delete this.requests[photo]
            })

            // Store the promise in the requests object
            this.requests[photo] = fetch

            try {
                // Await the promise to get the retrieved data
                const data = await fetch
                return data
            } catch (error) {
                // Handle the error here or propagate it to the calling code
                throw error
            }
        }
    }

    // Put data in the cache and optionally update the backend
    put(photo, value) {
        if (this.cache.has(photo)) {
            // If the key already exists, move it to the end
            this.cache.delete(photo)
        } else if (this.cache.size >= CAPACITY) {
            // If the cache is full, remove the least recently used item (the first key)
            const firstKey = this.cache.keys().next().value
            this.cache.delete(firstKey)
        }
        // Add the key-value pair to the end
        this.cache.set(photo, value)
    }

    // Delete an item from the cache
    delete(key) {
        this.cache.delete(key)
    }

    // Filter any key that contains the string and delete it
    filter(fieldsToMatch) {
        for (const key of this.cache.keys()) {
            if (fieldsToMatch.every(field => key.includes(field || 'actions'))) {
                console.log('deleting:', key)
                this.cache.delete(key)
            }
        }
    }

    // Clear the entire cache
    clear() {
        this.cache.clear()
    }

    // Get the current size of the cache
    size() {
        return this.cache.size
    }
}

export default new Cache()
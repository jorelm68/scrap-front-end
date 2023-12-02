import { CAPACITY } from '@env'
import {
    utilityGet,
    utilityGetPhoto,
    utilitySet,
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

    // Generates a unique cache key based on model name, identifier, and field
    key(modelName, identifier, field) {
        return `${modelName}->${identifier}->${field}`
    }

    // Retrieve data from cache or fetch from backend if not available
    async get(modelName, identifier, field, user) {
        const key = this.key(modelName, identifier, field)

        if (this.cache.has(key)) {
            // Cache hit - Move the key to the end to mark it as most recently used
            const value = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, value)
            return value
        } else {
            if (this.requests[key]) {
                // Cache miss but ongoing request for the same data - return the promise
                return this.requests[key]
            }

            // Cache miss and no ongoing request - create a new promise for data retrieval
            const fetch = new Promise(async (resolve, reject) => {
                try {
                    // Fetch data from the backend
                    const response = await utilityGet(modelName, identifier, field)

                    if (response.success) {
                        const data = response.data[field]
                        // Cache the retrieved data and resolve the promise with it
                        this.put(modelName, identifier, field, data, false)
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
                delete this.requests[key]
            })

            // Store the promise in the requests object
            this.requests[key] = fetch

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
    put(modelName, identifier, field, value) {
        const key = this.key(modelName, identifier, field)

        if (this.cache.has(key)) {
            // If the key already exists, move it to the end
            this.cache.delete(key)
        } else if (this.cache.size >= CAPACITY) {
            // If the cache is full, remove the least recently used item (the first key)
            const firstKey = this.cache.keys().next().value
            this.cache.delete(firstKey)
        }
        // Add the key-value pair to the end
        this.cache.set(key, value)
    }

    async push(modelName, identifier, field, value) {
        const key = this.key(modelName, identifier, field)

        try {
            // Check if there's already a put request for the same identifier:key combination
            if (this.putLocks.has(key)) {
                // Cancel the previous put request
                const previousPut = this.putLocks.get(key)
                previousPut.cancel()
            }

            // Create a cancellation token for the current put request
            const cancellationToken = new CancellationToken()

            // Store the cancellation token in the putLocks object
            this.putLocks.set(key, cancellationToken)

            // Store the new data in the backend
            const response = await utilitySet(modelName, identifier, field, value)

            if (!response) {
                throw new Error(response.error)
            }

            return response
        } catch (error) {
            throw error
        } finally {
            // Clean up the cancellation token after the put request is completed
            this.putLocks.delete(key)
        }
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
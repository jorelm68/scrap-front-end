import axios from 'axios'
import { API_URL, API_KEY } from '@env'
console.log(API_URL)

export const isDeviceOffline = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        return !response.ok // Returns true if the response is not OK (i.e., request failed)
    } catch (error) {
        // If there's an error during the fetch, assume the device is offline
        return true
    }
}

async function handleGet(route) {
    try {
        return await axios.get(`${API_URL}/${route}`, {
            responseType: 'json',
            headers: {
                'x-api-key': API_KEY
            },
        })

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            // If the server responded with an error message, return it
            return error.response.data.error
        } else {
            return 'An error occurred during the API request'
        }
    }
}
async function handlePatch(route, formData) {
    try {
        const response = await axios.patch(`${API_URL}/${route}`, formData, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'multipart/form-data',
            },
        })
        return response
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            // If the server responded with an error message, return it
            return error.response.data.error
        }
    }
}
async function handlePost(route, formData) {
    try {
        const response = await axios.post(`${API_URL}/${route}`, formData, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'multipart/form-data',
            },
        })
        return response
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            // If the server responded with an error message, return it
            return error.response.data.error
        } else {
            return 'An error occurred during the API request'
        }
    }
}
async function handleDelete(route) {
    try {
        const response = await axios.delete(`${API_URL}/${route}`, {
            headers: {
                'x-api-key': API_KEY,
            },
        })
        return response
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            // If the server responded with an error message, return it
            return error.response.data.error
        } else {
            return 'An error occurred during the API request'
        }
    }
}
async function handleResponse(route, data, method) {
    try {
        let response
        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }

        switch (method) {
            case 'get': {
                response = await handleGet(route, false)
                break
            }
            case 'post': {
                response = await handlePost(route, formData)
                break
            }
            case 'patch': {
                response = await handlePatch(route, formData)
                break
            }
            case 'delete': {
                response = await handleDelete(route)
                break
            }
            default: {
                return {
                    success: false,
                    error: 'Invalid response type'
                }
            }
        }

        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
            }
        }
        else {
            return {
                success: false,
                error: response
            }
        }

    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}
async function handleBlob(route) {
    try {
        const response = await fetch(`${API_URL}/${route}`, {
            headers: {
                'x-api-key': API_KEY,
            },
        });

        if (response.ok) {
            const blob = await response.blob();
            const dataUrl = URL.createObjectURL(blob);

            return {
                success: true,
                data: { iPhoto: { uri: dataUrl } }
            };
        } else {
            return {
                success: false,
                error: `Request failed with status: ${response.status}`,
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}

//-------------------------AUTHOR-------------------------------
export async function authorExists(author) {
    const route = 'api/authors/exists'
    const data = { author }
    return await handleResponse(route, data, 'post')
}
export async function authorSignUp(author) {
    const route = 'api/authors/signUp'
    console.log(author)
    return await handleResponse(route, author, 'post')
}
export async function authorSignIn(value, password) {
    const route = 'api/authors/signIn'
    const data = { value, password }
    return await handleResponse(route, data, 'post')
}
export async function authorDeleteAccount(author) {
    const route = `api/authors/deleteAccount`
    const data = { author }
    return await handleResponse(route, data, 'post')
}
export async function authorCheckCredentials(author, password) {
    const route = `api/authors/checkCredentials`
    const data = { author, password }
    return await handleResponse(route, data, 'post')
}
// <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>
export async function authorRemoveAction(author, action) {
    const route = `api/authors/removeAction`
    const data = { author, action }
    return await handleResponse(route, data, 'patch')
}
// <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>
export async function authorSendRequest(user, author) {
    const route = `api/authors/sendRequest`
    const data = { user, author }
    return await handleResponse(route, data, 'patch')
}
export async function authorRemoveRequest(user, author) {
    const route = `api/authors/removeRequest`
    const data = { user, author }
    return await handleResponse(route, data, 'patch')
}
export async function authorAcceptRequest(user, author) {
    const route = `api/authors/acceptRequest`
    const data = { user, author }
    return await handleResponse(route, data, 'patch')
}
export async function authorRejectRequest(user, author) {
    const route = `api/authors/rejectRequest`
    const data = { user, author }
    return await handleResponse(route, data, 'patch')
}
export async function authorRemoveFriend(user, author) {
    const route = `api/authors/removeFriend`
    const data = { user, author }
    return await handleResponse(route, data, 'patch')
}
//-------------------------AUTHOR-------------------------------

//--------------------------SCRAPS------------------------------
export async function scrapSaveScrap(scrap) {
    const route = `api/scraps/saveScrap`
    const data = {
        ...scrap,
        likes: JSON.stringify(scrap.likes),
        threads: JSON.stringify(scrap.threads),
        prograph: {
            uri: scrap.prograph.uri,
            type: 'image/jpeg',
            name: 'prograph',
        },
        retrograph: {
            uri: scrap.retrograph.uri,
            type: 'image/jpeg',
            name: 'retrograph',
        },
    }
    return await handleResponse(route, data, 'post')
}
export async function scrapDeleteScraps(scraps) {
    const route = `api/scraps/deleteScraps`
    const data = { scraps: JSON.stringify(scraps) }
    return await handleResponse(route, data, 'post')
}
export async function scrapExists(scrap) {
    const route = `api/scraps/exists`
    const data = { scrap }
    return await handleResponse(route, data, 'post')
}
//--------------------------SCRAPS------------------------------

//---------------------------BOOKS------------------------------
export async function bookExists(book) {
    const route = `api/books/exists`
    const data = { book }
    return await handleResponse(route, data, 'post')
}
export async function bookSaveBook(book) {
    const route = `api/books/saveBook`
    const data = {
        ...book,
        scraps: JSON.stringify(book.scraps)
    }
    return await handleResponse(route, data, 'post')
}
export async function bookDeleteBooks(books) {
    const route = `api/books/deleteBooks`
    const data = { books: JSON.stringify(books) }
    return await handleResponse(route, data, 'post')
}
// <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>
export async function bookAddLike(book, author) {
    const route = `api/books/addLike`
    const data = { book, author }
    return await handleResponse(route, data, 'patch')
}
export async function bookRemoveLike(book, author) {
    const route = `api/books/removeLike`
    const data = { book, author }
    return await handleResponse(route, data, 'patch')
}
// <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>
export async function bookAddScrap(book, scrap) {
    const route = `api/books/addScrap`
    const data = { book, scrap }
    return await handleResponse(route, data, 'patch')
}
export async function bookRemoveScrap(book, scrap) {
    const route = `api/books/removeScrap`
    const data = { book, scrap }
    return await handleResponse(route, data, 'patch')
}
//---------------------------BOOKS------------------------------

//-------------------------UTILITY------------------------------
export async function utilityAddThread(scrap, book) {
    const route = `api/utility/addThread`
    const data = { scrap, book }
    return await handleResponse(route, data, 'patch')
}
export async function utilityRemoveThread(scrap, book) {
    const route = `api/utility/removeThread`
    const data = { scrap, book }
    return await handleResponse(route, data, 'patch')
}
// <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>
export async function utilityAuthorSearch(author, search) {
    const route = `api/utility/authorSearch`
    const data = { author, search }
    return await handleResponse(route, data, 'post')
}
export async function utilityBookSearch(author, search) {
    const route = `api/utility/bookSearch`
    const data = { author, search }
    return await handleResponse(route, data, 'post')
}
export async function utilityScrapSearch(author, search) {
    const route = `api/utility/scrapSearch`
    const data = { author, search }
    return await handleResponse(route, data, 'post')
}
// <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>
export async function utilityGet(modelName, id, key) {
    const route = `api/utility/get/${modelName}/${id}/${key}`
    return await handleResponse(route, null, 'get')
}
export async function utilityGetPhoto(photo, size) {
    const route = `api/utility/getPhoto/${photo}/${size}`
    return await handleBlob(route)
}
export async function utilitySet(modelName, id, key, value) {
    const route = `api/utility/set`
    const data = { modelName, id, key, value }
    return await handleResponse(route, data, 'patch')
}
// <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>
export async function utilityQuestion(author, question) {
    const route = `api/utility/question`
    const data = { author, question }
    return await handleResponse(route, data, 'post')
}
//-------------------------UTILITY------------------------------
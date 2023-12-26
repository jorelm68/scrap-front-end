import axios from 'axios'
import { API_URL, API_KEY } from '@env'
console.log(API_URL)

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

async function readFileAsync(reader) {
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve({
                success: true,
                data: { iPhoto: { uri: base64data } }
            });
        };
        reader.onerror = () => {
            reject({
                success: false,
                error: 'Error reading the blob data',
            });
        };
    });
}

async function handleBlob(route) {
    try {
        const response = await axios.get(`${API_URL}/${route}`, {
            responseType: 'blob',
            headers: {
                'x-api-key': API_KEY
            },
        });

        if (response.status === 200) {
            const blob = await response.data

            const reader = new FileReader()
            reader.readAsDataURL(blob)

            return readFileAsync(reader)
        } else {
            return {
                success: false,
                error: response,
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
const author = {
    exists: async (author) => handleResponse('api/authors/exists', { author }, 'post'),
    signUp: async (author) => handleResponse('api/authors/signUp', author, 'post'),
    signIn: async (value, password) => handleResponse('api/authors/signIn', { value, password }, 'post'),
    deleteAccount: async (author) => handleResponse('api/authors/deleteAccount', { author }, 'post'),
    checkCredentials: async (author, password) => handleResponse('api/authors/checkCredentials', { author, password }, 'post'),
    forgotPassword: async (email) => handleResponse('api/authors/forgotPassword', { email }, 'post'),
    removeAction: async (author, action) => handleResponse('api/authors/removeAction', { author, action }, 'patch'),
    sendRequest: async (user, author) => handleResponse('api/authors/sendRequest', { user, author }, 'patch'),
    removeRequest: async (user, author) => handleResponse('api/authors/removeRequest', { user, author }, 'patch'),
    acceptRequest: async (user, author) => handleResponse('api/authors/acceptRequest', { user, author }, 'patch'),
    rejectRequest: async (user, author) => handleResponse('api/authors/rejectRequest', { user, author }, 'patch'),
    removeFriend: async (user, author) => handleResponse('api/authors/removeFriend', { user, author }, 'patch'),
}
//-------------------------AUTHOR-------------------------------

//--------------------------SCRAPS------------------------------
const scrap = {
    exists: async (scrap) => await handleResponse('api/scraps/exists', { scrap }, 'post'),
    saveScrap: async (scrap) => await handleResponse('api/scraps/saveScrap', {
        ...scrap,
        createdAt: JSON.stringify(scrap.createdAt),
        iPrograph: {
            uri: scrap.iPrograph.uri,
            type: 'image/jpeg',
            name: 'iPrograph',
        },
        iRetrograph: {
            uri: scrap.iRetrograph.uri,
            type: 'image/jpeg',
            name: 'iRetrograph',
        },
    }, 'post'),
    deleteScraps: async (scraps) => await handleResponse(`api/scraps/deleteScraps/${JSON.stringify(scraps)}`, null, 'delete'),
}
//--------------------------SCRAPS------------------------------

//---------------------------BOOKS------------------------------
const book = {
    exists: async (book) => await handleResponse('api/books/exists', { book }, 'post'),
    saveBook: async (book) => await handleResponse('api/books/saveBook', { ...book, scraps: JSON.stringify(book.scraps) }, 'post'),
    deleteBooks: async (books) => await handleResponse(`api/books/deleteBooks/${JSON.stringify(books)}`, null, 'delete'),
    addLike: async (book, author) => await handleResponse('api/books/addLike', { book, author }, 'patch'),
    removeLike: async (book, author) => await handleResponse('api/books/removeLike', { book, author }, 'patch'),
    addScrap: async (book, scrap) => await handleResponse('api/books/addScrap', { book, scrap }, 'patch'),
    removeScrap: async (book, scrap) => await handleResponse('api/books/removeScrap', { book, scrap }, 'patch'),
}
//---------------------------BOOKS------------------------------

//-------------------------UTILITY------------------------------
const utility = {
    addThread: async (scrap, book) => await handleResponse('api/utility/addThread', { scrap, book }, 'patch'),
    removeThread: async (scrap, book) => await handleResponse('api/utility/removeThread', { scrap, book }, 'patch'),
    authorSearch: async (author, search) => await handleResponse('api/utility/authorSearch', { author, search }, 'post'),
    bookSearch: async (author, search, remove) => await handleResponse('api/utility/bookSearch', { author, search, remove: JSON.stringify(remove) }, 'post'),
    get: async (model, id, key, user) => await handleResponse(`api/utility/get/${model}/${id}/${key}/${user}`, null, 'get'),
    getPhoto: async (photo, size) => await handleBlob(`api/utility/getPhoto/${photo}/${size}`),
    set: async (model, id, key, value) => await handleResponse('api/utility/set', { model, id, key, value }, 'patch'),
    scrapCoordinates: async (scraps) => await handleResponse('api/utility/scrapCoordinates', { scraps: JSON.stringify(scraps) }, 'post'),
    bookCoordinates: async (books) => await handleResponse('api/utility/bookCoordinates', { books: JSON.stringify(books) }, 'post'),
    question: async (author, question) => await handleResponse('api/utility/question', { author, question }, 'post'),
}
//-------------------------UTILITY------------------------------

export default {
    author,
    book,
    scrap,
    utility,
}
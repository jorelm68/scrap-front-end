export default {
    author: {
        pseudonym: /^[a-zA-Z0-9_]{3,16}$/,
        firstName: /^[A-Z][a-zA-Z\-]*$/,
        lastName: /^[A-Z][a-zA-Z\-]*$/,
        name: /^[A-Z][a-zA-Z\-]*$/,
        autobiography: /^[\s\S]{0,180}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^.{8,}$/,
        pseudonymOrEmail: /^(?:[a-zA-Z0-9_]{3,16}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
    },
    scrap: {
        title: /^.{0,80}$/,
        description: /^[\s\S]{0,2000}$/,
        place: /^.{0,40}$/,
    },
    book: {
        title: /^.{0,40}$/,
        description: /^[\s\S]{0,2000}$/,
    }
}
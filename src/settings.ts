import {config} from 'dotenv'
config() 
 
export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        POSTS: '/posts',
    },
}

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201, 
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    UNAUTHORIZED_401: 401,
    FORBIDDEN_403: 403,
    TOO_MANY_REQUESTS_429: 429
}

export interface DataApi {
    key: string | null
}

export interface ErrorApi {
    message: string | null
}

export interface RestResponse<Body extends DataApi> {
    originalResponse: any
    body: Body | Array<Body> | ErrorApi
    status: number
}

export enum RESOURCE_OPERATIONS {
    GET_COLLECTION = 'GET_COLLECTION',
    POST_COLLECTION = 'POST_COLLECTION',
    PUT_COLLECTION = 'PUT_COLLECTION',
    PATCH_COLLECTION = 'PATCH_COLLECTION',
    DELETE_COLLECTION = 'DELETE_COLLECTION',
    GET_UNIT = 'GET_UNIT',
    POST_UNIT = 'POST_UNIT',
    PUT_UNIT = 'PUT_UNIT',
    PATCH_UNIT = 'PATCH_UNIT',
    DELETE_UNIT = 'DELETE_UNIT',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS'
}

export const NOT_BODYABLE_OPERATIONS = [
    RESOURCE_OPERATIONS.GET_COLLECTION, 
    RESOURCE_OPERATIONS.GET_UNIT, 
    RESOURCE_OPERATIONS.HEAD, 
    RESOURCE_OPERATIONS.OPTIONS
]
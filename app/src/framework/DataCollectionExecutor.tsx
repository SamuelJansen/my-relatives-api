import { ContexState, ServiceState } from "../context-manager/ContextState"
import { AuthenticationService } from "../service/AuthenticationService"
import { ObjectUtil } from "../util/ObjectUtil"
import { DataApi, ErrorApi, NOT_BODYABLE_OPERATIONS, RESOURCE_OPERATIONS, RestResponse } from "./DataApi"

export const REST_METHODS = {
    [RESOURCE_OPERATIONS.GET_COLLECTION]: 'GET',
    [RESOURCE_OPERATIONS.POST_COLLECTION]: 'POST',
    [RESOURCE_OPERATIONS.PUT_COLLECTION]: 'PUT',
    [RESOURCE_OPERATIONS.PATCH_COLLECTION]: 'PATCH',
    [RESOURCE_OPERATIONS.DELETE_COLLECTION]: 'DELETE',

    [RESOURCE_OPERATIONS.GET_UNIT]: 'GET',
    [RESOURCE_OPERATIONS.POST_UNIT]: 'POST',
    [RESOURCE_OPERATIONS.PUT_UNIT]: 'PUT',
    [RESOURCE_OPERATIONS.PATCH_UNIT]: 'PATCH',
    [RESOURCE_OPERATIONS.DELETE_UNIT]: 'DELETE',

    [RESOURCE_OPERATIONS.HEAD]: 'HEAD',
    [RESOURCE_OPERATIONS.OPTIONS]: 'OPTIONS'

    // GET_COLLECTION = 'GET_COLLECTION',
    // POST_COLLECTION = 'POST_COLLECTION',
    // PUT_COLLECTION = 'PUT_COLLECTION',
    // PATCH_COLLECTION = 'PATCH_COLLECTION',
    // DELETE_COLLECTION = 'DELETE_COLLECTION',
    // GET_UNIT = 'GET_UNIT',
    // POST_UNIT = 'POST_UNIT',
    // PUT_UNIT = 'PUT_UNIT',
    // PATCH_UNIT = 'PATCH_UNIT',
    // DELETE_UNIT = 'DELETE_UNIT',
    // HEAD = 'HEAD',
    // OPTIONS = 'OPTIONS'
}

export interface DataCollectionProps<T extends ServiceState> {
    url: string, 
    stateName: string, 
    authenticationService: AuthenticationService
    service: ContexState<T>
}

export interface MessageDetails {
    key: string
    message: string
}

export interface ResourceState<T extends DataApi> {
    data: Map<string, T>,
    isProcessing: false,
    isProcessed: false
}

const informError = (props: {message: string | null, details: MessageDetails[]}) => {
    alert(props.message)
    console.log(props.message)
    console.log(props.details)
}

const COLLECTION_STATE_KEY = 'COLLECTION'

export class DataCollectionExecutor<T extends ServiceState, X extends DataApi, Y extends DataApi> {
    url: string
    stateName: string
    authenticationService: AuthenticationService
    service: ContexState<T>
    constructor(props: DataCollectionProps<T>) {
        this.url = props.url
        this.stateName = props.stateName
        this.authenticationService = props.authenticationService
        this.service = props.service
        this.service.setStateWithoutPropagation({
            [this.stateName]: {
                [COLLECTION_STATE_KEY]: {
                    data: {},
                    isProcessing: false,
                    isProcessed: false
                } as ResourceState<X>,
                [RESOURCE_OPERATIONS.GET_COLLECTION]: {
                    data: {},
                    isProcessing: false,
                    isProcessed: false
                } as ResourceState<X>,
                [RESOURCE_OPERATIONS.POST_COLLECTION]: {
                    data: {},
                    isProcessing: false,
                    isProcessed: false
                } as ResourceState<X>,
                [RESOURCE_OPERATIONS.PATCH_COLLECTION]: {
                    data: {},
                    isProcessing: false,
                    isProcessed: false
                } as ResourceState<X>
            }
        })
    }

    //collection
    dataCollectionIsLoaded = (hashable: any): boolean => {
        return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessed
    }

    dataCollectionIsNotLoaded = (hashable: any): boolean => {
        return !this.dataCollectionIsLoaded(hashable)
    }

    dataCollectionIsLoading = (hashable: any): boolean => {
        return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessing
    }

    dataCollectionIsNotLoading = (hashable: any): boolean => {
        return !this.dataCollectionIsLoading(hashable)
    }

    //get
    dataCollectionIsFound = (hashable: any): boolean => {
        // return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessed
        return this.service.getState()[this.stateName][RESOURCE_OPERATIONS.GET_COLLECTION].isProcessed
    }

    dataCollectionIsNotFound = (hashable: any): boolean => {
        return !this.dataCollectionIsFound(hashable)
    }

    dataCollectionIsFinding = (hashable: any): boolean => {
        // return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessing
        return this.service.getState()[this.stateName][RESOURCE_OPERATIONS.GET_COLLECTION].isProcessing
    }

    dataCollectionIsNotFinding = (hashable: any): boolean => {
        return !this.dataCollectionIsFinding(hashable)
    }

    //post
    dataCollectionIsCreated = (hashable: any): boolean => {
        // return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessed
        return this.service.getState()[this.stateName][RESOURCE_OPERATIONS.POST_COLLECTION].isProcessed
    }

    dataCollectionIsNotCreated = (hashable: any): boolean => {
        return !this.dataCollectionIsCreated(hashable)
    }

    dataCollectionIsCreating = (hashable: any): boolean => {
        // return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessing
        return this.service.getState()[this.stateName][RESOURCE_OPERATIONS.POST_COLLECTION].isProcessing
    }

    dataCollectionIsNotCreating = (hashable: any): boolean => {
        return !this.dataCollectionIsCreating(hashable)
    }

    //path
    dataCollectionIsPatched = (hashable: any): boolean => {
        // return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessed
        return this.service.getState()[this.stateName][RESOURCE_OPERATIONS.PATCH_COLLECTION].isProcessed
    }

    dataCollectionIsNotPatched = (hashable: any): boolean => {
        return !this.dataCollectionIsPatched(hashable)
    }

    dataCollectionIsPatching = (hashable: any): boolean => {
        // return this.service.getState()[this.stateName][COLLECTION_STATE_KEY].isProcessing
        return this.service.getState()[this.stateName][RESOURCE_OPERATIONS.PATCH_COLLECTION].isProcessing
    }

    dataCollectionIsNotPatching = (hashable: any): boolean => {
        return !this.dataCollectionIsPatching(hashable)
    }

    getDataCollection = (props?: {query?: {}}, callback?: CallableFunction): X[] => {
        const operation = RESOURCE_OPERATIONS.GET_COLLECTION
        if (this.dataCollectionIsLoading(props)) {
            return this._accessCurrentDataCollection(operation, props)
        }
        return this.authenticationService.isAuthorized() ? (() => {
            this._fetch([], operation, props, callback)
            return this._accessCurrentDataCollection(operation, props) 
        })() : [] 
    }

    
    postDataCollection = (request: Y[], props?: {query?: {}}, callback?: CallableFunction): X[] => {
        const operation = RESOURCE_OPERATIONS.POST_COLLECTION
        if (this.dataCollectionIsCreating({request, props})) {
            return []
        }
        return this.authenticationService.isAuthorized() ? (() => {
            this._fetch(request, operation, props, callback)
            return []
        })() : [] 
    }

    
    patchDataCollection = (request: Y[], props?: {query?: {}}, callback?: CallableFunction): X[] => {
        const operation = RESOURCE_OPERATIONS.PATCH_COLLECTION
        if (this.dataCollectionIsPatching({request, props})) {
            return []
        }
        return this.authenticationService.isAuthorized() ? (() => {
            this._fetch(request, operation, props, callback)
            return []
        })() : [] 
    }

    overrideDataCollection = (dataCollection: X[], operation: RESOURCE_OPERATIONS) => {
        const currentState = this.service.getState()
        dataCollection.forEach((data: X) => {
            if (!!!data.key) {
                data.key = ObjectUtil.generateUniqueKey()
                console.warn(`data should have a non null key. Guiving it a temporary key: ${data.key}`)
                console.warn(data)
            }
            currentState[this.stateName][COLLECTION_STATE_KEY].data[data.key] = {...data}
        });
        this._setProcessedState(currentState, operation)
        return this._accessStateDataCollectionValues(currentState[this.stateName][COLLECTION_STATE_KEY])
    }

    accessCachedDataCollection = (props?: {query?: {}}, operation = RESOURCE_OPERATIONS.GET_COLLECTION): X[] => {
        return this.authenticationService.isAuthorized() ? (() => {
            return this.dataCollectionIsLoaded(props) ? this._accessCurrentDataCollection(operation, props) : this.getDataCollection(props?.query ? {query: props.query} : {})
        })() : [] 
    }

    _fetch = (request: Y[], operation: RESOURCE_OPERATIONS, props?: {query?: {}}, callback?: CallableFunction) => {
        this._setProcessingState(operation)
        const isErrorApi = (body: X | Array<X> | ErrorApi): boolean => {
            return (body as ErrorApi)?.message !== undefined
        }
        try {
            const url = new URL(this.url)
            url.search = new URLSearchParams(props?.query ? props.query : {}).toString();
            const body = ObjectUtil.inIt(operation, NOT_BODYABLE_OPERATIONS) ? {} : {body: ObjectUtil.toJson(request)}
            fetch(url, {
                ...{
                    method: REST_METHODS[operation],
                    headers: this.authenticationService.getAuthenticatedHeader(),
                },
                ...body
            })
                .then(async (resp) => {
                    return {
                        body: (await resp.json()) as (Array<X> | ErrorApi),
                        status: resp.status,
                        originalResponse: resp
                    } as RestResponse<X>
                })
                .then((restResponse: RestResponse<X>) => {
                    // console.log(restResponse)
                    if (400 > restResponse.status && !isErrorApi(restResponse.body)) {
                        if (!isErrorApi(restResponse.body)) {
                            this.overrideDataCollection((restResponse.body as Array<X>), operation)
                        } else {
                            this._setNotProcessingState(operation)
                        }
                    } else {
                        this._setProcessedState(this.service.getState(), operation)
                        if (isErrorApi(restResponse.body)) {
                            informError({
                                message: (restResponse.body as ErrorApi)?.message,
                                details: []
                            })
                        }
                        if (401 === restResponse.status) {
                            this.authenticationService.doLogout()
                        }
                    }
                    return restResponse
                })
                .then((restResponse) => {
                    if (callback) callback()
                    return restResponse
                })
                .catch((error) => {
                    informError({
                        message: `Unable to ${operation.toLocaleLowerCase()} resources`,
                        details: [
                            {
                                key: error.message,
                                message: error.message
                            }
                        ]
                    })
                    this._setProcessedState(this.service.getState(), operation)
                })
        } catch (error: any) {
            this._setProcessedState(this.service.getState(), operation)
            console.log(error)
        }
    }

    _setProcessingState = (operation: RESOURCE_OPERATIONS) => {
        const statePatch = {isProcessing: true}
        this._updateResourceState(this.service.getState(), operation, statePatch) 
    }

    _setNotProcessingState = (operation: RESOURCE_OPERATIONS) => {
        const statePatch = {isProcessing: false}
        this._updateResourceState(this.service.getState(), operation, statePatch) 
    }

    _setProcessedState = (currentState: T, operation: RESOURCE_OPERATIONS) => {
        const statePatch = {isProcessed: true, isProcessing: false}
        this._updateResourceState(currentState, operation, statePatch) 
    }

    _updateResourceState = (currentState: T, operation: RESOURCE_OPERATIONS, statePatch: object) => {
        // console.log(operation)
        // console.log(statePatch)
        this.service.setState({[this.stateName]: this._mergeResourceState(currentState, operation, statePatch)})
        return this.service.setState({[this.stateName]: this._mergeResourceState(currentState, COLLECTION_STATE_KEY, statePatch)})
    }

    _mergeResourceState = (currentState: T, operation: string, statePatch: object) => {
        return {...currentState[this.stateName], ...{[operation]: {...currentState[this.stateName][operation], ...statePatch}}}
    }

    _accessCurrentDataCollection = (operation: RESOURCE_OPERATIONS, props?: {query?: {}}): X[] => {
        return this._accessStateDataCollectionValues(this.service.getState()[this.stateName][COLLECTION_STATE_KEY])
    }

    _accessStateDataCollectionValues = (stateData: any): X[] => {
        // console.log(stateData)
        return Object.values(stateData.data)
    } 
}
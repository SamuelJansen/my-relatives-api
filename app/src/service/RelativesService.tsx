import { ContexState, ServiceState } from "../context-manager/ContextState";
import { EnvironmentUtil } from '../util/environment/EnvironmentUtil'
import { ENVIRONEMNT_KEYS } from '../util/environment/EnvironmentKeys'
import { AuthenticationService } from "./AuthenticationService";
import { DataCollectionExecutor } from "../framework/DataCollectionExecutor";
import { DataApi } from "../framework/DataApi";
import { PersonApi } from "./PersonService";


const HTTPS_SCHEMA = `https`
const SCHEMA = EnvironmentUtil.isLocal() || EnvironmentUtil.isLocalToDevelopment() ? `http` : HTTPS_SCHEMA
const BASE_HOST = EnvironmentUtil.isLocal() || EnvironmentUtil.isLocalToDevelopment() ? `localhost` : EnvironmentUtil.get(ENVIRONEMNT_KEYS.BASE_HOST)
const API_HOST = EnvironmentUtil.isDevelopment() || EnvironmentUtil.isLocalToDevelopment() ? EnvironmentUtil.get(ENVIRONEMNT_KEYS.RELATIVES_API_HOST) : `${BASE_HOST}:9876` 
const API_BASE_URL = `${EnvironmentUtil.isLocalToDevelopment() ? HTTPS_SCHEMA : SCHEMA}://${API_HOST}/my-relatives-api`

export interface RelativesApi extends DataApi {
    name: string,
    mother: PersonApi,
    father: PersonApi,
    brotherList: Array<PersonApi>,
    sisterList: Array<PersonApi>,
    wife: PersonApi,
    husband: PersonApi
}

export interface RelativesRequestApi extends DataApi {}

export interface RelativesServiceStateProps {
    [key: string]: Array<RelativesApi>
}

export interface RelativesServiceProps {
    authenticationService: AuthenticationService
}

export class RelativesService extends ContexState<RelativesServiceStateProps> implements RelativesServiceProps {

    authenticationService: AuthenticationService
    relativesCollectionExecutor: DataCollectionExecutor<RelativesServiceStateProps, RelativesApi, RelativesRequestApi>

    constructor(props: RelativesServiceProps) {
        super()
        this.state = {
            ...this.state
        } as RelativesServiceStateProps
        this.authenticationService = props.authenticationService
        this.relativesCollectionExecutor = new DataCollectionExecutor<RelativesServiceStateProps, RelativesApi, RelativesRequestApi>({
            url: `${API_BASE_URL}/relatives/all`, 
            stateName: `relatives`, 
            service: this,
            authenticationService: this.authenticationService
        })
    }

    getCachedRelatives = () : RelativesApi[] => {
        return this.relativesCollectionExecutor.accessCachedDataCollection()
    }

    getRelatives = (query?: {keyList: string[], nameList: string[]}) : RelativesApi[] => {
        return this.relativesCollectionExecutor.getDataCollection({query})
    }
    
}

export const RelativesServiceProvider = (props: RelativesServiceProps) => new RelativesService(props)
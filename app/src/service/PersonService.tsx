import { ContexState, ServiceState } from "../context-manager/ContextState";
import { EnvironmentUtil } from '../util/environment/EnvironmentUtil'
import { ENVIRONEMNT_KEYS } from '../util/environment/EnvironmentKeys'
import { AuthenticationService } from "./AuthenticationService";
import { DataCollectionExecutor } from "../framework/DataCollectionExecutor";
import { DataApi } from "../framework/DataApi";


const HTTPS_SCHEMA = `https`
const SCHEMA = EnvironmentUtil.isLocal() || EnvironmentUtil.isLocalToDevelopment() ? `http` : HTTPS_SCHEMA
const BASE_HOST = EnvironmentUtil.isLocal() || EnvironmentUtil.isLocalToDevelopment() ? `localhost` : EnvironmentUtil.get(ENVIRONEMNT_KEYS.BASE_HOST)
const API_HOST = EnvironmentUtil.isDevelopment() || EnvironmentUtil.isLocalToDevelopment() ? EnvironmentUtil.get(ENVIRONEMNT_KEYS.PERSON_API_HOST) : `${BASE_HOST}:9876` 
const API_BASE_URL = `${EnvironmentUtil.isLocalToDevelopment() ? HTTPS_SCHEMA : SCHEMA}://${API_HOST}/my-relatives-api`

export interface PersonApi extends DataApi {
    name: string | null
}

export interface PersonRequestApi extends DataApi {}

export interface PersonServiceStateProps {
    [key: string]: Array<PersonApi>
}

export interface PersonServiceProps {
    authenticationService: AuthenticationService
}

export class PersonService extends ContexState<PersonServiceStateProps> implements PersonServiceProps {

    authenticationService: AuthenticationService
    personCollectionExecutor: DataCollectionExecutor<PersonServiceStateProps, PersonApi, PersonRequestApi>

    constructor(props: PersonServiceProps) {
        super()
        this.state = {
            ...this.state
        } as PersonServiceStateProps
        this.authenticationService = props.authenticationService
        this.personCollectionExecutor = new DataCollectionExecutor<PersonServiceStateProps, PersonApi, PersonRequestApi>({
            url: `${API_BASE_URL}/person/all`, 
            stateName: `person`, 
            service: this,
            authenticationService: this.authenticationService
        })
    }

    getCachedPerson = () : PersonApi[] => {
        return this.personCollectionExecutor.accessCachedDataCollection()
    }

    getPerson = (query?: {keyList: string[]}) : PersonApi[] => {
        return this.personCollectionExecutor.getDataCollection({query})
    }
    
}

export const PersonServiceProvider = (props: PersonServiceProps) => new PersonService(props)
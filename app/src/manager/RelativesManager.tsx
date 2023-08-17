import { ContexState, ManagerState } from "../context-manager/ContextState";
import { StyleService } from "../service/StyleService";
import { RelativesApi, RelativesRequestApi, RelativesService } from "../service/RelativesService";
import { ObjectUtil } from "../util/ObjectUtil";
import { PersonApi, PersonService } from "../service/PersonService";
import { ReflectionUtil } from "../util/ReflectionUtil";
import { Divide } from "phosphor-react";
// import { Relatives } from "phosphor-react";

export interface RelativesManagerStateProps extends ManagerState {
    accessiblePersonKeys: string[],
    selectedPerson: PersonApi
}

export interface RelativesManagerProps {
    styleService: StyleService,
    personService: PersonService,
    relativesService: RelativesService,
}


export class RelativesManager extends ContexState<RelativesManagerStateProps> implements RelativesManagerProps {
    
    styleService: StyleService
    personService: PersonService
    relativesService: RelativesService
    
    constructor(props: RelativesManagerProps) {
        super()
        this.styleService = props.styleService
        this.personService = props.personService
        this.relativesService = props.relativesService
        this.state = {
            ...this.state,
            ...{
                accessiblePersonKeys: [],
                selectedPerson: {
                    key: null,
                    name: null
                }
            }
        } as RelativesManagerStateProps
    }

    pushAccessiblePersonKey = (key: string) => {
        const accessiblePersonKeys = this.getAccessiblePersonKeys()
        ObjectUtil.pushItIfNotIn(key, accessiblePersonKeys)
        this.setState({accessiblePersonKeys: accessiblePersonKeys})
    }

    popAccessiblePersonKey = (key: string) => {
        const accessiblePersonKeys = this.getAccessiblePersonKeys()
        ObjectUtil.popIt(key, accessiblePersonKeys)
        this.setState({accessiblePersonKeys: accessiblePersonKeys})
    }

    getAccessiblePersonKeys = () => {
        return [
            ...this.getState().accessiblePersonKeys
        ]
    }

    isAccessiblePersonKey = (key: string) => {
        return ObjectUtil.inIt(key, this.getAccessiblePersonKeys())
    }

    getSelectedPerson = () => {
        return this.state.selectedPerson
    }

    setSelectedPerson = (person: PersonApi) => {
        if (this.getSelectedPerson().key && person.key === this.getSelectedPerson().key) {
            this.setState({selectedPerson: {
                key: null,
                name: null
            }})
        } else {
            this.setState({selectedPerson: {
                key: person.key,
                name: person.name
            }})
        }
        this.getPerson()
    }

    getPerson = () => {
        const personList = this.personService.getPerson({keyList: this.getAccessiblePersonKeys()})
        personList.forEach((person: PersonApi) => this.pushAccessiblePersonKey(!!person.key ? person.key : ObjectUtil.generateUniqueKey()))
        if (0 < personList.length && ObjectUtil.isEmpty(this.getSelectedPerson().name)) {
            this.setSelectedPerson(personList[0])
        }
        this.getRelatives({
            keyList: [],
            nameList: ObjectUtil.isNotEmpty(this.getSelectedPerson()?.name) ? [(this.getSelectedPerson().name as string)] : []
        })
        return personList
    }  

    getRelatives = (query?: {keyList: string[], nameList: string[]}) => {
        return this.relativesService.getRelatives(query)
    }

    renderPerson = () => {
        const personList = this.personService.getCachedPerson()
        return personList.map((person: PersonApi) => {
            return (
                <div 
                    key={person.key}
                    className={'container'}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto 20px auto',
                        padding: '20px',
                        backgroundColor: '#111',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#fff'
                      }}
                      onClick={() => this.setSelectedPerson(person)}
                >
                    {person.name}
                </div>
            )
        })
    }

    renderRelatives = () => {
        const relativesList = this.relativesService.getCachedRelatives()
        const selectedRelativeList: Array<RelativesApi> = this.relativesService.getCachedRelatives().filter((relatives: RelativesApi) => { 
            return relatives.name === this.getSelectedPerson().name
        })
        return (
            (ObjectUtil.isEmpty(selectedRelativeList) && ObjectUtil.isNotEmpty(relativesList)) ? (
                this.relativesService.relativesCollectionExecutor.dataCollectionIsLoading({}) ? [
                    {
                        key: ObjectUtil.generateUniqueKey(),
                        name: `loading ${this.getSelectedPerson().name}` 
                    } as RelativesApi
                ] : [relativesList[0]] 
            ) : selectedRelativeList
        ).map((relatives: RelativesApi) => {
            return (
                <div 
                    key={relatives.key}
                    className={'container'}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto 20px auto',
                        padding: '20px',
                        backgroundColor: '#111',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#fff'
                      }}
                >
                    <div className='personName'>
                        {relatives.name}
                    </div>
                    <div className='wife'>
                        {relatives.wife ? `Wife: ${relatives.wife?.name}` : null}
                    </div>
                    <div className='brotherList'>
                        {
                            relatives.brotherList ? relatives.brotherList.map((person: PersonApi) => {
                                return (
                                    <div
                                        key = {person.key}
                                    >
                                        Brother: {person.name}
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                </div>
            )
        })
    }

    render = () => {
        return <div>
            <div className={'relatives'}>
                {this.renderRelatives()},
            </div>
            <div className={'person'}>
                {this.renderPerson()}
            </div>
        </div>
    }
}


export const RelativesManagerProvider = (props: RelativesManagerProps) => new RelativesManager(props)
import { createContext } from 'react'
import { PageManager } from '../manager/PageManager'
import { AuthenticationService } from '../service/AuthenticationService'
import { StyleService } from '../service/StyleService'
import { RelativesManager } from '../manager/RelativesManager'
import { RelativesService } from '../service/RelativesService'
import { PageService } from '../service/PageService'
import { PersonService } from '../service/PersonService'


export interface AppContextProps {

  styleService: StyleService,
  authenticationService: AuthenticationService,
  personService: PersonService,
  relativesService: RelativesService,
  pageService: PageService,

  relativesManager: RelativesManager,
  pageManager: PageManager
  
}



// export const styleService = useContextState<StyleService>(() => StyleServiceProvider())
// export const authenticationService = useContextState<AuthenticationService>(() => AuthenticationServiceProvider())
// export const personService = useContextState<PersonService>(() => PersonServiceProvider({ authenticationService }))
// export const relativesService = useContextState<RelativesService>(() => RelativesServiceProvider({ authenticationService, personService }))
// export const pageService = useContextState<PageService>(() => PageServiceProvider({ authenticationService }))

// export const relativesManager = useContextState<RelativesManager>(() => RelativesManagerProvider({ styleService, relativesService }))
// export const pageManager = useContextState<PageManager>(() => PageManagerProvider({ styleService, pageService, relativesManager }))

// pageService.setManager(pageManager)

// export const appBeans: AppContextProps = {
//   styleService,
//   authenticationService,
//   relativesService,
//   personService,
//   pageService,
//   relativesManager,
//   pageManager,
// }

export const AppContext = createContext<AppContextProps | any>({})

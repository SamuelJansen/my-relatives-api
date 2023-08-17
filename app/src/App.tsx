import './styles/main.css'

import { AppContext, AppContextProps } from './context/AppContext'
import { TopbarComponent } from './component/topbar/TopbarComponent'
import { useContextState } from './context-manager/ContextState'
import { StyleService, StyleServiceProvider } from './service/StyleService'
import { AuthenticationService, AuthenticationServiceProvider } from './service/AuthenticationService'
import { PageService, PageServiceProvider } from './service/PageService'
import { PageManager, PageManagerProvider } from './manager/PageManager'
import { RelativesService, RelativesServiceProvider } from './service/RelativesService'
import { RelativesManager, RelativesManagerProvider } from './manager/RelativesManager'
import { PersonService, PersonServiceProvider } from './service/PersonService'

export const App = () => {
  
  const styleService = useContextState<StyleService>(() => StyleServiceProvider())
  const authenticationService = useContextState<AuthenticationService>(() => AuthenticationServiceProvider())
  const personService = useContextState<PersonService>(() => PersonServiceProvider({ authenticationService }))
  const relativesService = useContextState<RelativesService>(() => RelativesServiceProvider({ authenticationService }))
  const pageService = useContextState<PageService>(() => PageServiceProvider({ authenticationService }))
  
  const relativesManager = useContextState<RelativesManager>(() => RelativesManagerProvider({ styleService, personService, relativesService }))
  const pageManager = useContextState<PageManager>(() => PageManagerProvider({ styleService, pageService, relativesManager }))
  
  pageService.setManager(pageManager)
  
  const appBeans: AppContextProps = {
    styleService,
    authenticationService,
    relativesService,
    personService,
    pageService,
    relativesManager,
    pageManager,
  }

  return (
    <AppContext.Provider value={{ ...appBeans }}>
      <div className={`absolute w-screen h-auto min-h-screen m-0 flex flex-col ${styleService.getTWBackgroundColor()}`}>
        <TopbarComponent />
        <div className='w-100 h-100 flex flex-col pt-2'>
          {pageManager.renderSelectedPage()}
        </div>
      </div>
    </AppContext.Provider>
  )
}
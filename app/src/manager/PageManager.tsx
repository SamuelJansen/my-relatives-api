import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { ContexState, ManagerState } from "../context-manager/ContextState"
import { StyleService } from "../service/StyleService"
import { PAGES, PageService } from "../service/PageService"
import { RelativesManager } from './RelativesManager'


export interface PageManagerStateProps extends ManagerState {
}

export interface PageManagerProps {
    styleService: StyleService
    pageService: PageService

    relativesManager: RelativesManager
}

export class PageManager extends ContexState<PageManagerStateProps> implements PageManagerProps {
    
    styleService: StyleService
    pageService: PageService
    
    relativesManager: RelativesManager
    
    pages: {
        [key: string]: any
    }
    
    constructor(props: PageManagerProps) {
        super()
        this.styleService = props.styleService
        this.pageService = props.pageService

        this.relativesManager = props.relativesManager
        
        this.pages = {
            [PAGES.RELATIVES_PAGE_NAME]: {
                getData: () => this.relativesManager.getPerson(),
                renderPage: () => this.relativesManager.render(),
                reRenderPage: () => {
                    this.relativesManager.getPerson()
                    this.relativesManager.render()
                }
            }
        }

        this.state = {
            ...this.state
        } as PageManagerStateProps
    }

    renderIconPages = () => {
        return this.pageService.getAuthorizedPages().map((pageName: string, index: number) => {
            return (
                <ToggleGroup.Item
                    key={index} 
                    value={pageName}
                    className={`w-[100px] h-full mr-4 ${this.pageService.isSelectedPage(pageName) ? this.styleService.getTWBorder() : ''} flex justify-center items-center ${this.styleService.getTWTextColor()}`}
                    onClick={() => this.pages[pageName].getData() }
                >
                    <span>{pageName}</span>
                </ToggleGroup.Item>
            )
        })
    }

    renderPageSelector = () => {
        return (
            <ToggleGroup.Root
                type='single'
                value={this.pageService.getSelectedPage()}
                onValueChange={(pageName: string) => {
                    pageName!! && this.pageService.setSelectedPage(pageName)
                }}
                className='w-full h-full py-[0.3rem] flex justify-start items-center'
            >
                {this.renderIconPages()}
            </ToggleGroup.Root>
        )
    }

    renderSelectedPage = () => {
        return this.renderPage(this.pageService.getSelectedPage())
    }

    renderPage = (pageName: string) => {
        return !!Object.keys(this.pages).find(p => pageName === p) && this.pages[pageName].renderPage()
    }

    reRenderSelectedPage = () => {
        const pageName = this.pageService.getSelectedPage()
        return !!Object.keys(this.pages).find(p => pageName === p) && this.pages[pageName].reRenderPage()
    }
}

export const PageManagerProvider = (props: PageManagerProps) => new PageManager(props)
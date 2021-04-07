import { SnippetString, window } from "vscode";
import { ChecklistCategory, ChecklistType } from "./QuickPickItems";
import { SecurityKnowledgeFrameworkAPI } from "./SecurityKnowledgeFrameworkAPI";

class SKFQuickPick {
    private _skf: SecurityKnowledgeFrameworkAPI;
    // private static _categories: Promise<ChecklistCategory[]> = [];
    // private static _types: ChecklistType[] = []

    constructor() {
        this._skf = new SecurityKnowledgeFrameworkAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjYyODQ5OSwiaWF0IjoxNjE3NTQyMzUyLCJwcml2aWxlZ2UiOiJlZGl0OnJlYWQiLCJleHAiOjE2MTc1NDk1NTJ9.Ga7WqblSfgo6k2Ae5fDGRtpJRd6z9LP1O3ng18ltKdY')
        
        // this.CategoriesQuickPick()
        //     // .then(results => console.log(results))
    }

    async categoriesQuickPick() {
        const items: ChecklistCategory[] = [];

        for (const item of await this._skf.getChecklistCategories()) {
            items.push(new ChecklistCategory(item.id, item.name, item.description))
        }

        Promise.all(items)
            .then(items => window.showQuickPick(items))
            .then(category => this.getTypesFromCategoryById(category!.id))
    }

    /**
     * Returns the seconds QuickPick menu and inserts the comments after choosing an item from the QuickPick
     * @param id 
     * @returns all resolved Promises
     */
    async getTypesFromCategoryById(id: number) {
        const types: ChecklistType[] = [];

        for (const item of await this._skf.getChecklistTypes(id)) {
            types.push(new ChecklistType(item.id, item.title))    
        }

        return Promise.all(types)
            .then(items => window.showQuickPick(items))
            .then(async checklistItem => {
                window.activeTextEditor!.insertSnippet(new SnippetString(`$LINE_COMMENT CHECKLIST ITEMS FOR - ${checklistItem!.label}\n`))
                console.log(checklistItem)

                for (const item of await this._skf.getChecklistItems(checklistItem!.id)) {
                    // console.log(`${item.checklist_items_id} ${item.checklist_items_content}`)
                    window.activeTextEditor!.insertSnippet(new SnippetString(`$LINE_COMMENT ${item.checklist_items_id} ${item.checklist_items_content}\n`))
                }
                
            })
    }
}

export const skfQuickPick = new SKFQuickPick();


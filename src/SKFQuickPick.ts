/* eslint-disable max-len */
import {ChecklistCategory, ChecklistType} from './QuickPickItems';
import {SnippetString, TextEditor, window} from 'vscode';
import {FetchSKF} from './FetchSKF';

/**
 * Class that represents a QuickPick.
 * Fetches data from ./FetchSKF and shows as selection list in window.ShowQuickPick()
 */
export class SKFQuickPick {
    private _skf: FetchSKF;
    /**
     *
     */
    constructor() {
      this._skf = new FetchSKF('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjYyODQ5OSwiaWF0IjoxNjE3NTQyMzUyLCJwcml2aWxlZ2UiOiJlZGl0OnJlYWQiLCJleHAiOjE2MTc1NDk1NTJ9.Ga7WqblSfgo6k2Ae5fDGRtpJRd6z9LP1O3ng18ltKdY');
    }

    /**
     * Returns a showQuickPick with items fetched from Security Knowledge Framework API
     * API endpoint: /api/checklist_category/items
     */
    async categoriesQuickPick(): Promise<any> {
      const categories: ChecklistCategory[] = [];
      const data: any[] = await this._skf.getItemsFromUrl('/checklist_category/items');

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const item = data[key];

          categories.push(new ChecklistCategory(item.id, item.name));
        }
      }

      return Promise.all(categories).then((items) => window.showQuickPick(items));
    }

    /**
     * Returns a showQuickPick with items fetched from Security Knowledge Framework API
     * API endpoint:
     * @param {number} id
     */
    async checklistTypesQickPick(id: number): Promise<any> {
      const checklistTypes: ChecklistType[] = [];
      const data: any[] = await this._skf.getTypesForCategoryWithId(id);

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const item = data[key];

          checklistTypes.push(new ChecklistType(item.id, item.title));
        }
      }

      return Promise.all(checklistTypes).then((items) => window.showQuickPick(items));
    }

    /**
      * Fetches checklist items from Security Knowdledge Framework and inserts items as comments into activeTextEditor
      * If no activeEditor is open, ShowErrorMessage will pop up
      * @param {number} id
      */
    async onSelectChecklistTypeInsertComment(id: number): Promise<void> {
      const editor: TextEditor | undefined = window.activeTextEditor;
      const data: any[] = await this._skf.getChecklistItemsForTypeWithID(id);

      if (!editor) {
        window.showErrorMessage('Oops! Seems you do not have any Text Editors open');
      } else {
        data.forEach((item) => {
          window.activeTextEditor!.insertSnippet(new SnippetString(`$LINE_COMMENT ${item.checklist_items_id}. ${item.checklist_items_content}\n`));
        });

        window.showInformationMessage('Checklist items have been fetched');
      }
    }

    /**
     *
     */
    run() {
      this.categoriesQuickPick()
          .then((category) => this.checklistTypesQickPick(category.id))
          .then((types) => this.onSelectChecklistTypeInsertComment(types.id));
    }
}

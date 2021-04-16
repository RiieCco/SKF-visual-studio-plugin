/* eslint-disable max-len */
import {ChecklistCategory, ChecklistType} from './QuickPickItems';
import {getItemsFromUrl} from './data';
import {window} from 'vscode';


/**
 *
 * @return {Promise<any>} - A promise that is resolved to the selected item
 */
export const categoryPicker = async (): Promise<any> => {
  const checklistCategory: ChecklistCategory[] = [];
  const items: any[] = await getItemsFromUrl('/checklist_category/items');

  items.forEach((item) => checklistCategory.push(new ChecklistCategory(item.id, item.name)));

  return window.showQuickPick(checklistCategory);
};

/**
 * @param {number} id - a numerical id to fetch the correct items
 * @return {Promise<any>} - returns a Promise that is resolved to the selected item
 */
export const typePicker = async (id: number): Promise<any> => {
  const checklistTypes: ChecklistType[] = [];
  const items: any[] = await getItemsFromUrl(`/checklist_types/types/${id}`);

  items.forEach((item) => checklistTypes.push(new ChecklistType(item.id, item.title)));

  return window.showQuickPick(checklistTypes);
};

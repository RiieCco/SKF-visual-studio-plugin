/* eslint-disable max-len */
import {ChecklistCategory, ChecklistType} from './QuickPickItems';
import {getSKFChecklistCategories, getSKFChecklistTypesForCategoryWithId} from './data';
import {window} from 'vscode';


export const categoryPicker = async () => {
  const checklistCategory: ChecklistCategory[] = [];
  const items: any[] = await getSKFChecklistCategories();

  items.forEach((item) => checklistCategory.push(new ChecklistCategory(item.id, item.name)));

  return window.showQuickPick(checklistCategory);
};

export const typePicker = async (id: number) => {
  const checklistTypes: ChecklistType[] = [];
  const items: any[] = await getSKFChecklistTypesForCategoryWithId(id);

  items.forEach((item) => checklistTypes.push(new ChecklistType(item.id, item.title)));

  return window.showQuickPick(checklistTypes);
};

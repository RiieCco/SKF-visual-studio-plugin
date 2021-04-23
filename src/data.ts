/* eslint-disable max-len */
import {ChecklistCategory, ChecklistItem, ChecklistType} from './QuickPickItems';
import fetch from 'node-fetch';

const skfToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjYyODQ5OSwiaWF0IjoxNjE3NTQyMzUyLCJwcml2aWxlZ2UiOiJlZGl0OnJlYWQiLCJleHAiOjE2MTc1NDk1NTJ9.Ga7WqblSfgo6k2Ae5fDGRtpJRd6z9LP1O3ng18ltKdY';

/**
 *
 * @param {string} url - valid security knowledge framework api endpoint to fetch items from
 * @return {Promise} - a Promise that resolves to a JSON response with items
 */
export const getItemsFromUrl = async (url: string): Promise<any> => {
  const response = await fetch(`https://demo.securityknowledgeframework.org/api${url}`, {headers: {'Authentication': skfToken}});

  if (response.status === 200) {
    const data = await response.json();
    return data.items;
  } else if (response.status === 404) {
    throw new Error('404 not found');
  } else {
    throw new Error('Unable to fetch data');
  }
};

/**
 *
 * @return {Promise<any>} - A promise that resolves to an array of ChecklistCategories;
 */
export const getCategoryItems = async (): Promise<any> => {
  const checklistCategories: ChecklistCategory[] = [];
  const items: any[] = await getItemsFromUrl('/checklist_category/items');

  items.map((item) => checklistCategories.push(new ChecklistCategory(item.id, item.name)));

  return checklistCategories;
};

/**
 * @param {number} id - a numerical id to fetch the correct items
 * @return {Promise<any>} - a Promise that resolved to an array of ChecklistTypes
 */
export const getTypeItems = async (id: number): Promise<any> => {
  const checklistTypes: ChecklistType[] = [];
  const items: any[] = await getItemsFromUrl(`/checklist_types/types/${id}`);

  items.map((item) => checklistTypes.push(new ChecklistType(item.id, item.title)));

  return checklistTypes;
};

export const getChecklistItems = async (id: number): Promise<any> => {
  const checklistItems: ChecklistItem[] = [];
  const items: any[] = await getItemsFromUrl(`/checklist/items/${id}`);

  items.map((item) => checklistItems.push(new ChecklistItem(item.checklist_items_id, item.checklist_items_content)));

  return checklistItems;
};

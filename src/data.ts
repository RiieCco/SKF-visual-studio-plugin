/* eslint-disable max-len */
import fetch from 'node-fetch';

const baseUrl = 'https://demo.securityknowledgeframework.org/api';
const skfToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjYyODQ5OSwiaWF0IjoxNjE3NTQyMzUyLCJwcml2aWxlZ2UiOiJlZGl0OnJlYWQiLCJleHAiOjE2MTc1NDk1NTJ9.Ga7WqblSfgo6k2Ae5fDGRtpJRd6z9LP1O3ng18ltKdY';

export const getResponse = async (url: string): Promise<any> => {
  const response = await fetch(url, {headers: {'Authentication': skfToken}});

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Unable to fetch data');
  }
};

export const getItemsFromUrl = async (url: string): Promise<any> => {
  const data = await getResponse(`${baseUrl}${url}`);

  return data.items;
};

export const getSKFChecklistCategories = async (): Promise<any> => {
  const data = await getResponse(`${baseUrl}/checklist_category/items`);

  return data.items;
};

export const getSKFChecklistTypesForCategoryWithId = async (id: number): Promise<any> => {
  const object: any[] = await getSKFChecklistCategories();

  const item = object.find((item) => item.id === id);

  return getItemsFromUrl(`/checklist_types/types/${item.id}`);
};

export const getSKFChecklistItemsForTypeWithId = async (id: number): Promise<any> => {
  const object: any[] = await getItemsFromUrl(`/checklist_types/types/${id}`);

  const item = object.find((item) => item.id === id);

  return getItemsFromUrl(`/checklist/items/${item.id}`);
};

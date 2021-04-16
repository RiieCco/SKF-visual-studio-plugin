/* eslint-disable max-len */
import fetch from 'node-fetch';

const skfToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjYyODQ5OSwiaWF0IjoxNjE3NTQyMzUyLCJwcml2aWxlZ2UiOiJlZGl0OnJlYWQiLCJleHAiOjE2MTc1NDk1NTJ9.Ga7WqblSfgo6k2Ae5fDGRtpJRd6z9LP1O3ng18ltKdY';

/**
 *
 * @param {string} url - valid security knowledge framework api endpoint to fetch items from
 * @return {Promise}
 */
export const getItemsFromUrl = async (url: string): Promise<any> => {
  const response = await fetch(`https://demo.securityknowledgeframework.org/api${url}`, {headers: {'Authentication': skfToken}});

  if (response.status === 200) {
    const data = await response.json();
    return data.items;
  } else {
    throw new Error('Unable to fetch data');
  }
};

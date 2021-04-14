/* eslint-disable max-len */
import fetch from 'node-fetch';

/**
 * Class that fetches items from Security Knowledge Framework
 * needs authorization token for certain API endpoints;
 */
export class FetchSKF {
    private static readonly _baseAPIUrl: string = 'https://demo.securityknowledgeframework.org/api'
    private _token: string;

    /**
     * constructor that takes the authorization token
     * @param {string} token - an authorization token for Security Knowledge Framework API
     */
    constructor(token: string) {
      this._token = token;
    }

    /**
     * Returns a json response or throw a new Error
     * @param {string} url
     * @param {{}} options optional
     * @return {Promise}
     */
    async getResponse(url: string, options?: {}): Promise<any> {
      const response = await fetch(url, options);

      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Unable to fetch API');
      }
    }

    /**
     * Returns items from the given SKF API endpoint
     * example endpoint: https://demo.securityknowledgeframework.org/api/checklist_category/items
     * @param {string} url
     */
    async getItemsFromUrl(url: string): Promise<any> {
      const data = await this.getResponse(`${FetchSKF._baseAPIUrl}${url}`, {
        headers: {'Authorization': this._token},
      });

      return data.items;
    }

    /**
     * Returns checklist types from endpoint /checklist_types/types/${id}
     * example:
     * @param {number} id
     * @return {Promise}
     */
    async getTypesForCategoryWithId(id: number): Promise<any> {
      const categories: any[] = await this.getItemsFromUrl('/checklist_category/items');

      for (const key in categories) {
        if (Object.prototype.hasOwnProperty.call(categories, key)) {
          const item = categories[key];
          if (item.id === id) {
            return this.getItemsFromUrl(`/checklist_types/types/${id}`);
          }
        }
      }

      return;
    }

    /**
     * Fetches items from "/checklist/items/{id} and returns the data"
     * @param {number} id
     * @return {Promise} array of items fetched from "/checklist/items/{id}"
     */
    async getChecklistItemsForTypeWithID(id: number): Promise<any> {
      const data: any[] = await this.getItemsFromUrl(`/checklist/items/${id}`);

      return data;
    }
}

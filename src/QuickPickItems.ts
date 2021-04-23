/* eslint-disable require-jsdoc */
import {QuickPickItem} from 'vscode';

/**
 *
 */
export class ChecklistCategory implements QuickPickItem {
    id: number;
    label: string;
    description?: string;

    /**
     *
     * @param {number} id
     * @param {string} label
     * @param {string} description
     */
    constructor(id: number, label: string, description?: string) {
      this.id = id;
      this.label = `${this.id}. ${label}`;
    }
}

/**
 *
 */
export class ChecklistType implements QuickPickItem {
    id: number;
    label: string;
    description?: string;
    title: any;

    /**
     *
     * @param {number} id
     * @param {string} label
     * @param {string} description
     */
    constructor(id: number, label: string, description?: string) {
      this.id = id;
      this.label = `${this.id}. ${label}`;
      this.description = description;
    }
}

export class ChecklistItem implements QuickPickItem {
  id: number;
  label: string;

  constructor(id: number, label: string) {
    this.id = id;
    this.label = `${this.id}. ${label}`;
  }
}

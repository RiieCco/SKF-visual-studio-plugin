/* eslint-disable max-len */
import {commands, ExtensionContext, window} from 'vscode';
import {getCategoryItems, getChecklistItems, getTypeItems} from './data';
import {onSelectInsertComment} from './utils';

/**
 * @param {ExtensionContext} context
 */
export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('skf.start', () => {
    getCategoryItems()
        .then((categories: any) => window.showQuickPick(categories))
        .then((category: any) => getTypeItems(category!.id))
        .then((types: any) => window.showQuickPick(types))
        .then((type: any) => onSelectInsertComment(type.id))
        .catch((err) => window.showErrorMessage(`Error: ${err}`));
  });

  context.subscriptions.push(disposable);
}

// eslint-disable-next-line require-jsdoc
export function deactivate() {}

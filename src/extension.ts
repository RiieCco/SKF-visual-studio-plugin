/* eslint-disable max-len */
import {commands, ExtensionContext, window} from 'vscode';
import {categoryPicker, typePicker} from './picker';
import {onSelectItemInsertComment} from './utils';


// const quickPick = new SKFQuickPick();

/**
 * Calls the run method of SKFQuickPick instance and will show the ShowQuickPick
 * @param {ExtensionContext} context
 */
export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('skf.start', () => {
    categoryPicker()
        .then((item) => typePicker(item.id))
        .then((item) => onSelectItemInsertComment(item.id))
        .catch((err) => window.showErrorMessage(`Something went wrong.\n${err}`));
  });

  context.subscriptions.push(disposable);
}

// eslint-disable-next-line require-jsdoc
export function deactivate() {}

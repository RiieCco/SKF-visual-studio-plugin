import {commands, ExtensionContext} from 'vscode';
import {SKFQuickPick} from './SKFQuickPick';


const quickPick = new SKFQuickPick();

/**
 * Calls the run method of SKFQuickPick instance and will show the ShowQuickPick
 * @param {ExtensionContext} context
 */
export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('skf.start', () => {
    quickPick.run();
  });

  context.subscriptions.push(disposable);
}

// eslint-disable-next-line require-jsdoc
export function deactivate() {}

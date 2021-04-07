import { commands, ExtensionContext, window, workspace } from 'vscode';
import { skfQuickPick } from './SKFQuickPick';

export function activate(context: ExtensionContext) {

	let disposable = commands.registerCommand('skf.start', () => {

		skfQuickPick.categoriesQuickPick();

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

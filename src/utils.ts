/* eslint-disable max-len */
import {SnippetString, TextEditor, window} from 'vscode';
import {getChecklistItems} from './data';

/**
 * @param {number} id - takes numerical id as an argument and inserts checklist items
 */
export const onSelectInsertComment = async (id: number): Promise<void> => {
  const editor: TextEditor = window.activeTextEditor!;
  const items: any[] = await getChecklistItems(id);

  items.reverse(); // Workaround to output comments in correct numerical order inside the TextEditor

  checkEditor(editor);

  items.forEach((item) => {
    editor?.insertSnippet(new SnippetString(`$LINE_COMMENT ${item.label}\n`));
  });

  window.showInformationMessage('Checklist items have been added');
};

/**
 * @param {TextEditor} editor - if no editor exist, throw error
 */
const checkEditor = (editor: TextEditor) => {
  if (!editor) {
    throw new Error('No TextEditor available');
  }
};

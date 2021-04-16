/* eslint-disable max-len */
import {SnippetString, TextEditor, window} from 'vscode';
import {getItemsFromUrl} from './data';

/**
 * Inserts line comments with items fetched from '/api/checklist/items/[id]' if there is an activeEditor
 * @param {number} id
 */
export const onSelectItemInsertComment = async (id: number): Promise<void> => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  const items: any[] = await getItemsFromUrl(`/checklist/items/${id}`);

  if (!editor) {
    window.showWarningMessage('Hmmm. Seems you do not have any active editors');
  } else {
    items.forEach((item) => {
      editor.insertSnippet(new SnippetString(`$LINE_COMMENT ${item.checklist_items_id}. ${item.checklist_items_content}\n`));
    });
  };
};

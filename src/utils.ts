/* eslint-disable max-len */
import {SnippetString, TextEditor, window} from 'vscode';
import {getSKFChecklistItemsForTypeWithId} from './data';

export const onSelectItemInsertComment = async (id: number) => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  const items: any[] = await getSKFChecklistItemsForTypeWithId(id);

  if (!editor) {
    window.showWarningMessage('Hmmm. Seems you do not have any editors open');
  } else {
    items.forEach((item) => {
      editor?.insertSnippet(new SnippetString(`$LINE_COMMENT ${item.checklist_items_id}. ${item.checklist_items_content}\n`));
    });
  }
};

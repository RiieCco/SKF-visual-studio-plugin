/* eslint-disable max-len */
import {SnippetString, TextEditor, window} from 'vscode';
import {getChecklistItems} from './data';

export const onSelectInsertComment = async (id: number): Promise<void> => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  const items: any[] = await getChecklistItems(id);

  items.reverse(); // Workaround to output comments in correct numerical order inside the TextEditor

  if (!editor) {
    window.showWarningMessage('No editors are open in you workspace');
  } else {
    items.forEach((item) => {
      editor?.insertSnippet(new SnippetString(`$LINE_COMMENT ${item.label}\n`));
    });

    window.showInformationMessage('Great. Checklist items have been inserted');
  }
};

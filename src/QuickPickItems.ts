import { QuickPickItem } from "vscode";

export class ChecklistCategory implements QuickPickItem {
    id: number;
    label: string;
    description?: string;

    constructor(id: number, label: string, description?: string) {
        this.id = id;
        this.label = `${this.id}. ${label}`;
    }
}

export class ChecklistType implements QuickPickItem {
    id: number;
    label: string;
    description?: string;
    title: any;

    constructor(id: number, label: string, description?: string) {
        this.id = id;
        this.label = `${this.id}. ${label}`;
        this.description = description;
    }
}
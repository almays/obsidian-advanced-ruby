import { EditorPosition, type Editor } from "obsidian";

import { ESCAPE_CHAR, MD_RUBY_SYNTAX } from "../constants";
import { type Syntax } from "../types";
import { isTableRow } from "./isTableRow";

// Wrap selected text in MD ruby markup
export function addMDRubyWrapper(editor: Editor, selection: string): void {
	const { head, divider, tail }: Syntax = MD_RUBY_SYNTAX;

	// Escape the divider inside tables so it does not start a new cell
	const line: string = editor.getLine(editor.getCursor("from").line);
	const safeDivider: string = isTableRow(line)
		? `${ESCAPE_CHAR}${divider}`
		: divider;

	editor.replaceSelection(`${head}${selection}${safeDivider}${tail}`);

	// Step inside the bracket for user input
	const cursor: EditorPosition = editor.getCursor();
	editor.setCursor({ line: cursor.line, ch: cursor.ch - tail.length });
}

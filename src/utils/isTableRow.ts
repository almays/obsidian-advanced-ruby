// A Markdown table row starts with a pipe (after optional indentation)
export function isTableRow(line: string): boolean {
	return line.trimStart().startsWith("|");
}

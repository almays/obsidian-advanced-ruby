import { MD_RUBY_SYNTAX } from "../constants";
import { type Syntax } from "../types";

// Find the first of the target characters at the given nesting depth
export function findCharAtDepthFrom(
	targets: string[],
	depth: number,
	text: string,
	start: number,
): number | undefined {
	const { head, tail }: Syntax = MD_RUBY_SYNTAX;
	for (
		let index: number = start;
		index < text.length && depth <= 2;
		index += 1
	) {
		const character: string | undefined = text[index];
		if (character === head) depth += 1;
		else if (character === tail) depth -= 1;
		if (character !== undefined && targets.includes(character) && depth === 0)
			return index;
	}
	return;
}

import { RangeSetBuilder } from "@codemirror/state";
import {
	Decoration,
	type DecorationSet,
	type EditorView,
} from "@codemirror/view";

import { RubyWidget } from "rendering/RubyWidget";
import { type Ruby } from "../types";
import { isCursorInsideRuby } from "./isCursorInsideRuby";
import { isInsideCode } from "./isInsideCode";
import { isRubyUnusable } from "./isRubyUnusable";

const hiddenBrace: Decoration = Decoration.replace({});

export function getRubyDecorations(
	view: EditorView,
	rubyToDecorate: Ruby[],
): DecorationSet {
	const builder = new RangeSetBuilder<Decoration>();
	for (const ruby of rubyToDecorate) {
		if (
			isCursorInsideRuby(ruby, view) ||
			isInsideCode(ruby.start, view) ||
			isRubyUnusable(ruby, view)
		)
			continue;

		// Hide the braces on their own and keep the widget between them.
		// A widget starting or ending exactly where a syntax mark does is
		// placed outside that mark, losing e.g. blockquote color or emphasis
		builder.add(ruby.start, ruby.start + 1, hiddenBrace);
		builder.add(
			ruby.start + 1,
			ruby.end - 1,
			Decoration.replace({
				widget: new RubyWidget(ruby.base, ruby.ruby),
			}),
		);
		builder.add(ruby.end - 1, ruby.end, hiddenBrace);
	}
	const rubyDecorations = builder.finish();
	return rubyDecorations;
}

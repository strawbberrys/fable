import { Character } from "./character";

export type DialogueLine<S extends Character | undefined = Character | undefined> = [
	message: string | readonly string[],
	speaker?: S | Character,
	config?: {},
];

// probably doesn't need to be a class if they will be added to the fable
export class Dialogue<S extends Character | undefined = Character | undefined> {
	constructor(
		private lines: ReadonlyArray<DialogueLine<S>>,
		soleSpeaker?: S,
	) {}
}

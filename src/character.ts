import { Dialogue } from "./dialogue";

export class Character<D extends Dialogue = Dialogue> {
	private readonly dialogue: D;
	public readonly name: string;

	constructor(name: string, dialogue: D) {
		this.dialogue = dialogue;
		this.name = name;
	}

	public say(messages: ReadonlyArray<string>) {}
	public startDialogue() {}
}

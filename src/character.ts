export class Character {
	private dialogue: Map<string, ReadonlyArray<string>>;
	public readonly name: string;

	constructor(name: string) {
		this.dialogue = new Map<string, ReadonlyArray<string>>();
		this.name = name;
	}

	addDialogue(name: string, dialogue: ReadonlyArray<string>) {
		assert(!this.dialogue.has(name), "Character already has dialogue with that name");

		this.dialogue.set(name, dialogue);
	}

	playDialogue(name: string) {
		assert(this.dialogue.has(name), "Character has no dialogue with that name");
	}
}

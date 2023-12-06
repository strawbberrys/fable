export class Character {
	private dialogue: Map<string, ReadonlyArray<string>>;

	/**
	 * Creates a {@link Character}.
	 *
	 * @param name - A name for the {@link Character}.
	 */
	constructor(private name: string) {
		this.dialogue = new Map();
	}

	/**
	 * Adds dialogue to the {@link Character}.
	 *
	 * @param name - The name of the dialogue.
	 * @param dialogue - An ordered list of dialogue strings.
	 *
	 * @throws
	 * Thrown if the {@link Character} already has dialogue with the given name.
	 */
	addDialogue(name: string, dialogue: ReadonlyArray<string>) {
		assert(!this.dialogue.has(name), 'Character already has dialogue with that name');

		this.dialogue.set(name, dialogue);
	}

	/**
	 * Plays dialogue from the {@link Character}.
	 *
	 * @param name - The name of the dialogue.
	 *
	 * @remarks
	 * This will pass the dialogue to the interface handler.
	 *
	 * @throws
	 * Thrown if the {@link Character} has no dialogue with the given name.
	 */
	playDialogue(name: string) {
		assert(this.dialogue.has(name), 'Character has no dialogue with that name');
	}

	/**
	 * @returns The name of the {@link Character}.
	 */
	getName(): string {
		return this.name;
	}
}

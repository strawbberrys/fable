import type { Act } from "./act";
import type { Character } from "./character";

// The ultimate goal of this library is to make the simplest yet most customizable way to create a story game.
// KEYWORD: simple

/*
	add basic libraries/methods to make game creation even easier.

	* lobby system
	* sound and music (implement into Act)
	* cut-scenes (implement into Act)
	* data saving
	* life system
*/

export type ActList = ReadonlyArray<Act>;
export type CharacterList = ReadonlyArray<Character>;

export interface FableComponents<A extends ActList, C extends CharacterList> {
	readonly acts: A;
	readonly characters: C;
	readonly name: string;
}

// not everything is connected, ex. Character's have no connection to the Fable so why even pass them?
export class Fable<A extends ActList, C extends CharacterList> {
	private readonly acts: A;
	private readonly characters: C; // maybe make this public? then this is how you would access characters.
	public readonly name: string;

	private currentAct?: Act;

	constructor(components: FableComponents<A, C>) {
		this.acts = components.acts;
		this.characters = components.characters;
		this.name = components.name;
	}

	/// Plays a specific Act.
	public playAct(name: A[number]["name"]) {
		const currentAct = this.currentAct;
		const targetAct = this.acts.find((act) => act.name === name);

		assert(!currentAct, `An Act with the name '${currentAct?.name}' is already playing in the Fable '${this.name}`);
		assert(targetAct, `There is no Act with the name '${name as string}' in the Fable '${this.name}'`);

		targetAct.completed.connect(() => (this.currentAct = undefined));
		targetAct.play();

		this.currentAct = targetAct;
	}

	/// Plays each Act in order.
	public start() {
		const acts = this.acts;
		const currentAct = this.currentAct;

		assert(!currentAct, `An Act with the name '${currentAct?.name}' is already playing in the Fable '${this.name}`);

		for (const act of acts) {
			act.play();
			act.completed.connect(() => {}); // yield until act has completed.
		}
	}
}

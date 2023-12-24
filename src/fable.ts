import { Act } from "./act";
import { Character } from "./character";
import { UiProvider } from "./ui-provider";

/*
	need to add basic libraries/methods to make game creation even easier.

	* lobby system
	* sound and music (implement into Act)
	* cut-scenes (implement into Act)
	* data saving
	* life system
*/

export class Fable {
	private acts: Map<string, Act>;
	private characters: Map<string, Character>;

	private currentAct?: Act;

	public readonly name: string;

	constructor(name: string, uiProvider?: UiProvider) {
		this.acts = new Map<string, Act>();
		this.characters = new Map<string, Character>();

		this.name = name;
	}

	public addAct(act: Act) {
		const acts = this.acts;
		const actName = act.name;

		assert(!acts.has(actName), `There is already an Act with the name '${actName} in the Fable '${this.name}`);

		acts.set(actName, act);
	}

	public addActs(actList: ReadonlyArray<Act>) {
		const acts = this.acts;

		for (const act of actList) {
			const actName = act.name;

			assert(!acts.has(actName), `There is already an Act with the name '${actName} in the Fable '${this.name}`);

			acts.set(actName, act);
		}
	}

	public addCharacter(character: Character) {
		const characters = this.characters;
		const characterName = character.name;

		assert(
			!characters.has(characterName),
			`There is already a Character with the name '${characterName}' in the Fable '${this.name}'`,
		);

		characters.set(characterName, character);
	}

	public addCharacters(characterList: ReadonlyArray<Character>) {
		const characters = this.characters;

		for (const character of characterList) {
			const characterName = character.name;

			assert(
				!characters.has(characterName),
				`There is already a Character with the name '${characterName}' in the Fable '${this.name}'`,
			);

			characters.set(character.name, character);
		}
	}

	public playAct(name: string) {
		const currentAct = this.currentAct;
		const targetAct = this.acts.get(name);

		assert(!currentAct, `An Act with the name '${currentAct?.name}' is already playing in the Fable '${this.name}`);
		assert(targetAct, `There is no Act with the name '${name}' in the Fable '${this.name}'`);

		targetAct.completed.connect(() => (this.currentAct = undefined));
		targetAct.play();

		this.currentAct = targetAct;
	}
}

import { Character } from './character';
import { Act } from './act';

export class Fable {
	private characters: Map<string, Character>;
	private acts: Map<string, Act>;

	private currentAct: Act | undefined;

	/**
	 * Creates a {@link Fable}.
	 *
	 * @param name - A name for the {@link Fable}.
	 */
	constructor(private name: string) {
		this.characters = new Map();
		this.acts = new Map();
	}

	/**
	 * Plays an {@link Act} in the {@link Fable}.
	 *
	 * @param name - The name of the {@link Act}.
	 *
	 * @throws
	 * Thrown if an {@link Act} is already playing in the {@link Fable}.
	 *
	 * @throws
	 * Thrown if no {@link Act} exists with the given name in the {@link Fable}.
	 */
	playAct(name: string) {
		assert(
			this.currentAct === undefined,
			`An Act with the name '${this.currentAct?.getName()}' is already playing in the Fable '${this.name}`,
		);

		const acts = this.acts;
		const act = acts.get(name);

		assert(act !== undefined, `There is no Act with the name '${name}' in the Fable '${this.name}'`);

		act.onCompletion(() => (this.currentAct = undefined));
		act.play();

		this.currentAct = act;
	}

	/**
	 * Adds a {@link Character} to the {@link Fable}.
	 *
	 * @param character - The {@link Character} object.
	 *
	 * @throws
	 * Thrown if another {@link Character} with the same name already exists in the {@link Fable}.
	 */
	addCharacter(character: Character) {
		const characters = this.characters;
		const characterName = character.getName();

		assert(
			!characters.has(characterName),
			`There is already a Character with the name '${characterName}' in the Fable '${this.name}'`,
		);

		characters.set(characterName, character);
	}

	/**
	 * Adds a list of {@link Character}'s to the {@link Fable}.
	 *
	 * @param characterList - An array of {@link Character}'s.
	 *
	 * @throws
	 * Thrown if another {@link Character} with the same name already exists in the {@link Fable}.
	 */
	addCharacters(characterList: ReadonlyArray<Character>) {
		const characters = this.characters;
		const characterNames = characterList.map((character) => character.getName());

		for (const characterName of characterNames) {
			assert(
				!characters.has(characterName),
				`There is already a Character with the name '${characterName}' in the Fable '${this.name}'`,
			);
		}

		for (const character of characterList) {
			characters.set(character.getName(), character);
		}
	}

	/**
	 * Adds a {@link Act} to the {@link Fable}.
	 *
	 * @param act - The {@link Act} object.
	 *
	 * @throws
	 * Thrown if another {@link Act} with the same name already exists in the {@link Fable}.
	 */
	addAct(act: Act) {
		const acts = this.acts;
		const actName = act.getName();

		assert(!acts.has(actName), `There is already a Act with the name '${actName} in the Fable '${this.name}`);

		acts.set(actName, act);
	}

	/**
	 * Adds a list of {@link Act}'s to the {@link Fable}.
	 *
	 * @param actList - An array of {@link Act}'s.
	 *
	 * @throws
	 * Thrown if another {@link Act} with the same name already exists in the {@link Fable}.
	 */
	addActs(actList: ReadonlyArray<Act>) {
		const acts = this.acts;
		const actNames = actList.map((act) => act.getName());

		for (const actName of actNames) {
			assert(!acts.has(actName), `There is already a Act with the name '${actName}' in the Fable '${this.name}'`);
		}

		for (const act of actList) {
			acts.set(act.getName(), act);
		}
	}

	/**
	 * Returns a {@link Character} from its name.
	 *
	 * @param name - The name of the {@link Character}.
	 *
	 * @returns The {@link Character} or undefined.
	 */
	getCharacterByName(name: string): Character | undefined {
		return this.characters.get(name);
	}
}

/*
    import { Fable, Act, Character, Task, ListedTask, GroupedTask } from '@rbxts/fable'

    const story = new Fable('Escape Drake\'s Mansion');
    const intro = new Act('intro');

    const enterHouse = new Task((completeTask) => {
        hitbox.Touched.Once(completeTask);
    });

    const enterBasement = new Task((completeTask) => {
        hitbox.Touched.Once(completeTask);
    });

    const grabRedGem = new Task((completeTask) => {
        workspace.Gem.ProximityPrompt.Activated.Once(completeTask);
    });

    const grabBlueGem = new Task((completeTask) => {
        workspace.Gem.ProximityPrompt.Activated.Once(completeTask);
    });

    // GroupedTask's are for grouping multiple tasks together where the order **does not** matter. Once every task is completed, the GroupedTask will be completed.
    const grabGems = new GroupedTask(grabRedGem, grabBlueGem);

    // ListedTask's are for grouping multiple tasks together where the order **does** matter. Once the last task is completed, the ListedTask will be completed.
    const gotoDestination = new ListedTask(enterHouse, enterBasement);

    // Each act can only have one task. This means you have to use something like a ListedTask if you want multiple tasks in a act.
    const mainTask = new ListedTask(gotoDestination, grabGems);

    intro.setTask(mainTask);

    // Each fable will have its own set of characters. They can be used anywhere for things such as dialog, interaction, etc. by requiring the fable from another script.
    story.addCharacter(new Character('Drake', 'rbxassetid://0'));
    story.addCharacter(new Character('Evil Drake', 'rbxassetid://0'));

    story.setActs([intro]);
*/

/*
        export abstract class BaseTask {
            constructor(objective: string)
        }
*/

/*
    import { story } from "example";

    story.play();
*/

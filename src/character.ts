import type { Dialogue } from "./dialogue";
import { showDialogue } from "./remotes";

export class Character {
	public readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	public say(dialogue: Dialogue, players: ReadonlyArray<Player>) {
		for (const player of players) {
			showDialogue.FireClient(player, dialogue);
		}
	}
}

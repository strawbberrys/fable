import type { Dialogue } from "./dialogue";
import { showDialogue } from "./remotes";

export class Character<N extends string = string> {
	public readonly name: N;

	constructor(name: N) {
		this.name = name;
	}

	public say(dialogue: Dialogue<this>, players: ReadonlyArray<Player>) {
		for (const player of players) {
			showDialogue.FireClient(player, dialogue);
			print(dialogue);
		}
	}
}

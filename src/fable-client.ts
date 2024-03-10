import { showDialogue } from "./remotes";
import type { UiProvider } from "./ui-provider";

export namespace FableClient {
	let started = false;

	export function start(uiProvider: UiProvider) {
		assert(!started, "The Fable client has already been started.");

		started = true;

		showDialogue.OnClientEvent.Connect((dialogue) => uiProvider.createDialogue(dialogue));
	}
}

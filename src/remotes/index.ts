import type { Dialogue } from "../dialogue";

declare interface ThisScript extends ModuleScript {
	"show-dialogue": RemoteEvent<(dialogue: Dialogue) => void>;
}

declare const script: ThisScript;

export const showDialogue = script["show-dialogue"];

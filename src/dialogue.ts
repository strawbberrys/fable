type DialogueCallback = (player: Player) => void;

export interface DialogueOption {
	readonly message: string; // the choice text
	readonly response?: string | ReadonlyArray<string>; // the response text, can be just one string or an array of strings
	readonly callback?: DialogueCallback; // called when selected
	readonly choices?: ReadonlyArray<DialogueOption>; // list of choices
}

export interface Dialogue extends Pick<DialogueOption, "choices"> {
	readonly greeting: string; // said at the start of every interaction
	readonly farewell: string; // said whenever the goodbye option is chosen
}

import type { Dialogue } from "./dialogue";

export interface UiProvider {
	createDialogue(dialogue: Dialogue): void;
	createShop(): void;
}

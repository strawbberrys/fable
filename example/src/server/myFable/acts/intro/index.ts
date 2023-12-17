import { Act } from "@rbxts/fable";
import { CocoTheCube, DanTheDino } from "../../characters";
import { enterHouse } from "../../tasks";

export const Intro = new Act("intro", enterHouse);

Intro.playing.connect(() => {
	CocoTheCube.playDialogue("intro"); // need to either change how characters are made or change how i access it.
});

Intro.completed.connect(() => {
	print("Intro complete");
});

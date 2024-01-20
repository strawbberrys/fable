import { Act } from "@rbxts/fable";
import { CocoTheCube, DanTheDino } from "../../characters";
import { enterDoor } from "../../tasks";

export const Intro = new Act("intro", enterDoor);

Intro.playing.connect(() => {});

Intro.completed.connect(() => {
	print("Intro complete");
});

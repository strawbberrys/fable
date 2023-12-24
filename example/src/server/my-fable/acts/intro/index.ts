import { Act } from "@rbxts/fable";
import { CocoTheCube, DanTheDino } from "../../characters";
import { enterDoor } from "../../tasks";

export const Intro = new Act("intro", enterDoor);

Intro.playing.connect(() => {
	CocoTheCube.say(["Hello there!"]);
});

Intro.completed.connect(() => {
	print("Intro complete");
});

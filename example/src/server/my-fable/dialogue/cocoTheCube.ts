import { Dialogue } from "@rbxts/fable";
import { cocoTheCube, danTheDino } from "../characters";

export const introduction = new Dialogue(
	[["Hello, my name is Coco The Cube!"], ["I like to bounce around."]],
	cocoTheCube,
);

const goodbyeDialogue = new Dialogue([
	["Hey, I need to tell you something.", danTheDino],
	["What is it?", cocoTheCube],
	["Well, I'll be getting a new job next month, so I'll be moving out of this house.", danTheDino],
	["Alright, just make sure you replace everything.", cocoTheCube],
]);

const twistMessage = new Dialogue([
	[
		["AND", "YOU", "WILL", "DIEEE!"],
		danTheDino,
		[
			/* interval: 1 */
		],
	],
]);

import { Character, Dialogue } from "@rbxts/fable";

const dialogue: Dialogue = {
	greeting: "Hello. You should go through my door.",
	farewell: "See you later.",
	choices: [
		{
			message: "Is this real?",
			response: "Of course it is.",
			choices: [
				{
					message: "Prove it.",
					response: "Ok.",
					callback: (player) => player.Kick(),
				},
			],
		},
	],
};

export const CocoTheCube = new Character("Coco the Cube", dialogue);

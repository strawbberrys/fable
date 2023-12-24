import { Character, Dialogue } from "@rbxts/fable";

const dialogue: Dialogue = {
	greeting: "Hello, friend!",
	farewell: "Bye bye!",
	choices: [
		{
			message: "How did you get here?",
			response: "I came from that door.",
			choices: [
				{
					message: "What's behind there?",
					response: "I don't want to spoil it.",
					choices: [
						{
							message: "Is something bad back there?",
							response: "No.",
						},
					],
				},
				{
					message: "Ok...",
					response: "Go through it.",
				},
			],
		},
	],
};

export const DanTheDino = new Character("Dan the Dino", dialogue);

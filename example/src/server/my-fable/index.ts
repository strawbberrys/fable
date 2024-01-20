import { Fable } from "@rbxts/fable";
import { acts } from "./acts";
import { characters } from "./characters";

export const myFable = new Fable({
	acts: acts,
	characters: characters,
	name: "my-fable",
});

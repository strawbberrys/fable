import { Fable } from "@rbxts/fable";
import { CocoTheCube } from "./characters";
import { DanTheDino } from "./characters";
import { Intro } from "./acts";

export const myFable = new Fable("myFable");

myFable.addCharacter(CocoTheCube);
myFable.addCharacter(DanTheDino);
// myFable.addCharacters([CocoTheCube, DanTheDino]);

myFable.addAct(Intro);

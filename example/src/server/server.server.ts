import { myFable } from "./my-fable";
import { introduction } from "./my-fable/dialogue/cocoTheCube"; // probably should build this into the fable. I might change the Fable class into a builder which activates everything, but I don't know how I'll implement that into the module.

const Workspace = game.GetService("Workspace");

const cocoTheCube = myFable.getCharacter("Coco the Cube");
const cocoTheCubeModel = Workspace.map.cocoTheCube;

cocoTheCubeModel.ProximityPrompt.Triggered.Connect((player) => cocoTheCube.say(introduction, [player]));
myFable.start();

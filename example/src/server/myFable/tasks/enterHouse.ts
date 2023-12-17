import { Task, Watcher } from "@rbxts/fable";

const Players = game.GetService("Players");
const Workspace = game.GetService("Workspace");

const doorPart = Workspace.Home.DoorPart;
const teleportLocation = new CFrame(500, 5, 500);

function teleportPlayers(location: CFrame) {
	for (const player of Players.GetPlayers()) {
		const character = player.Character;
		const primaryPart = character?.PrimaryPart;

		if (primaryPart) {
			primaryPart.CFrame = location;
		}
	}
}

const watcher = new Watcher((complete) => {
	doorPart.Touched.Once((otherPart) => {
		const character = otherPart.FindFirstAncestorOfClass("Model");
		const player = Players.GetPlayerFromCharacter(character);

		if (player) {
			print(`${player.Name} touched the door.`);
			teleportPlayers(teleportLocation);
			complete();
		}
	});
});

export const enterHouse = new Task(watcher);

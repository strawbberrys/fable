import { Task, Watcher } from "@rbxts/fable";

const Players = game.GetService("Players");
const Workspace = game.GetService("Workspace");

const prompt = Workspace.map.door.doorKnob.ProximityPrompt;
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
	prompt.Triggered.Once((player) => {
		print(`${player.Name} opened the door.`);
		teleportPlayers(teleportLocation);
		complete();
	});
});

export const enterDoor = new Task(watcher);

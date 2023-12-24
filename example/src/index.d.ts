interface Workspace extends Instance {
	map: Model & {
		baseplate: Part;
		cocoTheCube: Part & {
			ProximityPrompt: ProximityPrompt;
		};
		danTheDino: Model & {
			head: Model & {
				nose: UnionOperation & {
					ProximityPrompt: ProximityPrompt;
				};
			};
		};
		door: Part & {
			doorKnob: UnionOperation & {
				ProximityPrompt: ProximityPrompt;
			};
		};
	};
}

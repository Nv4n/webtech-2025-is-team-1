import { Project } from "@/components/Project/types/Project";

const projects: Record<string, Project> = {
	"1": { id: "1", name: "Pulse" },
	"2": { id: "2", name: "Nimbus" },
	"3": { id: "3", name: "Vertex" },
	"4": { id: "4", name: "Quantum" },
	"5": { id: "5", name: "Fusion" },
	"6": { id: "6", name: "Core" },
};

export const FakeProjectApi = () => {
	const getProjectList = () => {
		return new Promise<Record<string, Project>>((resolve) => {
			setTimeout(() => {
				resolve(projects);
			}, 250);
		});
	};
	return { getProjectList };
};

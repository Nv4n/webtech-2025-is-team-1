import { Project } from "@/components/Project/types/Project";

const projects: Record<string, Project> = {
	"1": { name: "Pulse" },
	"2": { name: "Nimbus" },
	"3": { name: "Vertex" },
	"4": { name: "Quantum" },
	"5": { name: "Fusion" },
	"6": { name: "Core" },
};

export const FakeProjectApi = () => {
	const getProjectList = (): Record<string, Project> => {
		return projects;
	};
	return { getProjectList };
};

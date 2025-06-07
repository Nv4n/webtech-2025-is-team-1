import { Project } from "@/features/Project/types/Project";

const projects: Record<string, Project> = {
	"1": {
		id: "1",
		name: "Pulse",
		description:
			"Система за мониторинг в реално време, която следи здравето и производителността на приложения и сървъри.",
		createdAt: new Date("2024-01-01T10:00:00Z"),
		workflowId: "wf-101",
		ownerId: "2",
	},
	"2": {
		id: "2",
		name: "Nimbus",
		description:
			"Облачна платформа за управление на инфраструктура и автоматизация на процеси в големи системи.",
		createdAt: new Date("2024-01-02T10:00:00Z"),
		workflowId: "wf-102",
		ownerId: "5",
	},
	"3": {
		id: "3",
		name: "Vertex",
		description:
			"Интелигентна платформа за анализ на данни и вземане на стратегически решения чрез машинно обучение.",
		createdAt: new Date("2024-01-03T10:00:00Z"),
		workflowId: "wf-103",
		ownerId: "5",
	},
	"4": {
		id: "4",
		name: "Quantum",
		description:
			"Иновационен проект, фокусиран върху квантови изчисления и симулации за научни и индустриални приложения.",
		createdAt: new Date("2024-01-04T10:00:00Z"),
		workflowId: "wf-104",
		ownerId: "4",
	},
	"5": {
		id: "5",
		name: "Fusion",
		description:
			"Интегрирана система за обединяване на различни данни и услуги в единна платформа за по-ефективна работа.",
		createdAt: new Date("2024-01-05T10:00:00Z"),
		workflowId: "wf-105",
		ownerId: "3",
	},
	"6": {
		id: "6",
		name: "Core",
		description:
			"Сърцевината на цялата екосистема – централен модул, който координира комуникацията между всички проекти.",
		createdAt: new Date("2024-01-06T10:00:00Z"),
		workflowId: "wf-106",
		ownerId: "1",
	},
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

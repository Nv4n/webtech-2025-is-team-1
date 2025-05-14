import { Project } from "@/components/Project/types/Project";

const projects: Record<string, Project> = {
	"1": {
		id: "1",
		name: "Pulse",
		description:
			"Система за мониторинг в реално време, която следи здравето и производителността на приложения и сървъри.",
	},
	"2": {
		id: "2",
		name: "Nimbus",
		description:
			"Облачна платформа за управление на инфраструктура и автоматизация на процеси в големи системи.",
	},
	"3": {
		id: "3",
		name: "Vertex",
		description:
			"Интелигентна платформа за анализ на данни и вземане на стратегически решения чрез машинно обучение.",
	},
	"4": {
		id: "4",
		name: "Quantum",
		description:
			"Иновационен проект, фокусиран върху квантови изчисления и симулации за научни и индустриални приложения.",
	},
	"5": {
		id: "5",
		name: "Fusion",
		description:
			"Интегрирана система за обединяване на различни данни и услуги в единна платформа за по-ефективна работа.",
	},
	"6": {
		id: "6",
		name: "Core",
		description:
			"Сърцевината на цялата екосистема – централен модул, който координира комуникацията между всички проекти.",
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

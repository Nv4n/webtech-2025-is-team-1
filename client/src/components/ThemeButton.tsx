import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/usehooks-ts/useDarkTheme";
import { Moon, Sun } from "lucide-react";

const htmlElement = document.getElementById("html")!;

export const ThemeButton = () => {
	const { isDarkMode, toggle } = useDarkMode();

	if (isDarkMode) {
		htmlElement.classList.add("dark");
	} else {
		htmlElement.classList.remove("dark");
	}

	return (
		<Button
			className="cursor-pointer"
			onClick={toggle}
			variant="outline"
			size="icon"
		>
			{!!isDarkMode ? <Sun /> : <Moon />}
		</Button>
	);
};

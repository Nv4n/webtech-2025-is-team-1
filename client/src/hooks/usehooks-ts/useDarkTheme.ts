import { useIsomorphicLayoutEffect } from "./useIsomorphicLayourEffect";
import { useLocalStorage } from "./useLocalStorage";
import { useMediaQuery } from "./useMediaQuery";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const LOCAL_STORAGE_KEY = "dark-mode";

type DarkModeOptions = {
	defaultValue?: boolean;
	localStorageKey?: string;
	initializeWithValue?: boolean;
};

type DarkModeReturn = {
	isDarkMode: boolean;
	toggle: () => void;
	enable: () => void;
	disable: () => void;
	set: (value: boolean) => void;
};

export function useDarkMode(options: DarkModeOptions = {}): DarkModeReturn {
	const {
		defaultValue,
		localStorageKey = LOCAL_STORAGE_KEY,
		initializeWithValue = true,
	} = options;

	const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
		initializeWithValue,
		defaultValue,
	});
	const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
		localStorageKey,
		defaultValue ?? isDarkOS ?? false,
		{ initializeWithValue }
	);

	// Update darkMode if os prefers changes
	useIsomorphicLayoutEffect(() => {
		if (isDarkOS !== isDarkMode) {
			setDarkMode(isDarkOS);
		}
	}, [isDarkOS]);

	return {
		isDarkMode,
		toggle: () => {
			setDarkMode((prev) => !prev);
		},
		enable: () => {
			setDarkMode(true);
		},
		disable: () => {
			setDarkMode(false);
		},
		set: (value) => {
			setDarkMode(value);
		},
	};
}
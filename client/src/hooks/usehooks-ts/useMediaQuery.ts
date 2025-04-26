import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayourEffect";

type UseMediaQueryOptions = {
	defaultValue?: boolean;
	initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

function getMatches(query: string, defaultValue: boolean): boolean {
	if (IS_SERVER) {
		return defaultValue;
	}
	return window.matchMedia(query).matches;
}

export function useMediaQuery(
	query: string,
	{
		defaultValue = false,
		initializeWithValue = true,
	}: UseMediaQueryOptions = {}
): boolean {
	const [matches, setMatches] = useState<boolean>(() => {
		if (initializeWithValue) {
			console.log(getMatches(query, defaultValue));

			return getMatches(query, defaultValue);
		}
		return defaultValue;
	});

	// Handles the change event of the media query.
	function handleChange() {
		setMatches(getMatches(query, defaultValue));
	}

	useIsomorphicLayoutEffect(() => {
		const matchMedia = window.matchMedia(query);

		// Triggered at the first client-side load and if query changes
		handleChange();

		// Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange);
		} else {
			matchMedia.addEventListener("change", handleChange);
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener("change", handleChange);
			}
		};
	}, [query]);

	return matches;
}

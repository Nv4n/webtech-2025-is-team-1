import js from "@eslint/js";
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist", "vite.config.*", "tsconfig.*"] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...pluginQuery.configs['flat/recommended'],
			eslintPluginPrettierRecommended,
			"prettier",
		],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"react-x": reactX,
			"react-dom": reactDom,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			...reactX.configs["recommended-typescript"].rules,
			...reactDom.configs.recommended.rules,
			"prettier/prettier": [
				"error",
				{
					endOfLine: "auto",
				},
			],
		},
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	}
);

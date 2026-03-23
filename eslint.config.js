import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	// apply recommended rules to JS files
	{
		name: "your-project/recommended-rules",
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
	},

	// apply recommended rules to JS files with an override
	{
		name: "your-project/recommended-rules-with-override",
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
		},
	},

	// apply all rules to JS files
	{
		name: "your-project/all-rules",
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/all"],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
import { defineConfig } from "tsup";

const inDevMode = process.env.DEV === "true";

console.log(`-= ${inDevMode ? "DEVELOPMENT" : "PRODUCTION"} MODE =-`);

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["cjs", "esm"],
	tsconfig: "./tsconfig.json",
	target: "es2017",
	sourcemap: true,
	minify: !inDevMode,
	// When in dev mode, we first build then watch, so we do not want the `watch` to
	// clean the out directory.
	clean: !inDevMode,
	dts: true,
	define: {
		"process.env.NODE_ENV": JSON.stringify(
			inDevMode ? "development" : "production",
		),
	},
});

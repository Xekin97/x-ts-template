import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import externals from "rollup-plugin-node-externals";

import pkg from "./package.json" assert { type: "json" };

const defaultOutput = {
	name: pkg.name,
	exports: "named",
	preserveModules: true,
	preserveModulesRoot: "src",
};

const defaultPlugins = [
	externals({
		devDeps: false,
	}),
	resolve(),
	commonjs(),
	json(),
	strip(),
	terser(),
];

export default [
	// for commonjs
	{
		input: "./src/index.ts",
		output: [
			{
				dir: pkg.common,
				format: "cjs",
				...defaultOutput,
			},
		],
		plugins: [
			typescript({
				outDir: pkg.common,
			}),
			...defaultPlugins,
		],
	},
	{
		input: "./src/index.ts",
		output: [
			{
				dir: pkg.module,
				format: "es",
				...defaultOutput,
			},
		],
		plugins: [
			typescript({
				outDir: pkg.module,
			}),
			...defaultPlugins,
		],
	},
];

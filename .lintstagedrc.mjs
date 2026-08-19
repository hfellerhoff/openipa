import path from "node:path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((filename) => JSON.stringify(path.relative(process.cwd(), filename)))
    .join(" ")}`;

const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};

export default config;

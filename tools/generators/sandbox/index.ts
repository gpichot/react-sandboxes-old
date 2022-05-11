import {
  Tree,
  formatFiles,
  installPackagesTask,
  updateJson,
} from "@nrwl/devkit";
import { libraryGenerator } from "@nrwl/workspace/generators";
import { applicationGenerator } from "@nrwl/react";
import { normalizeOptions } from "@nrwl/react/src/generators/application/lib/normalize-options";
import { NormalizedSchema } from "@nrwl/react/src/generators/application/schema";

export default async function (tree: Tree, schema: any) {
  const baseOptions = normalizeOptions(tree, {
    ...schema,
    directory: `sandboxes/${schema.category}`,
    style: "scss",
    linter: "eslint",
    e2eTestRunner: "none",
    unitTestRunner: "none",
  }) as NormalizedSchema & { category: "" };
  const options = {
    ...baseOptions,
  };
  await applicationGenerator(tree, options);

  // Delete unused files
  tree.delete(`${options.appProjectRoot}/jest.config.js`);
  tree.delete(`${options.appProjectRoot}/src/app/app.tsx`);
  tree.delete(`${options.appProjectRoot}/src/app/app.module.scss`);
  tree.delete(`${options.appProjectRoot}/src/app/nx-welcome.tsx`);
  tree.delete(`${options.appProjectRoot}/src/app/`);
  tree.delete(`${options.appProjectRoot}/src/enviroments`);
  tree.delete(`${options.appProjectRoot}/src/favicon.ico`);
  tree.delete(`${options.appProjectRoot}/.babelrc`);
  tree.delete(`${options.appProjectRoot}/.browserslistrc`);
  tree.delete(`${options.appProjectRoot}/src/assets/.gitkeep`);
  tree.delete(`${options.appProjectRoot}/src/environments/environment.prod.ts`);
  tree.delete(`${options.appProjectRoot}/src/environments/environment.ts`);
  tree.delete(`${options.appProjectRoot}/src/polyfills.ts`);
  tree.delete(`${options.appProjectRoot}/src/styles.scss`);
  tree.delete(`${options.appProjectRoot}/tsconfig.json`);
  tree.delete(`${options.appProjectRoot}/tsconfig.app.json`);
  tree.delete(`${options.appProjectRoot}/.eslintrc.json`);
  tree.rename(
    `${options.appProjectRoot}/src/main.tsx`,
    `${options.appProjectRoot}/src/index.tsx`
  );

  // Add package.json
  await addPackageJson(tree, options);
  await createMainFile(tree, options);
  await createBabelRc(tree, options);
  await createTsconfig(tree, options);
}

async function addPackageJson(tree: Tree, options: any) {
  const filePath = `${options.appProjectRoot}/package.json`;
  tree.write(
    filePath,
    `{
  "dependencies": {
    "@craftvalue/sandbox-react-common": "^0.0.1",
    "react": "^18.1.0",
    "react-dom": "^18.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.1.0",
    "@types/react-dom": "^18.1.0"
  }
}
`
  );
}

async function createMainFile(tree: Tree, options: any) {
  const filePath = `${options.appProjectRoot}/src/main.tsx`;
  tree.write(
    filePath,
    `
import React from 'react';

function App() {
  return <p>Hello World</p>;
}

export const meta = {
  main: App,
};

export default meta;
`
  );
}

async function createBabelRc(tree: Tree, options: any) {
  const filePath = `${options.appProjectRoot}/.babelrc`;
  tree.write(
    filePath,
    `{
  "presets": [
    "@babel/typescript",
    "@babel/preset-react"
  ]
}`
  );
}

async function createTsconfig(tree: Tree, options: any) {
  const filePath = `${options.appProjectRoot}/tsconfig.json`;
  tree.write(
    filePath,
    `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "paths": {
      "@craftvalue/sandbox-react-common": [
        "../../libs/sandbox-react-common/src/index.ts"
      ]
    }
  }
}`
  );
}

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@duck/typescript-config/base.json",
  "compilerOptions": {
    "lib": ["ES2022", "dom", "dom.iterable"],
    "baseUrl": ".",
    "outDir": "./dist",
    "module": "Preserve",
    "moduleResolution": "bundler",
    "paths": {
      "~/old-registry-ui": ["../_oldstuff_refactor/ui/*"],
      "~/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ],
    "isolatedModules": true
  },
  "include": [
    ".",
    ".next/types/**/*.ts",
    "../../packages/_oldstuff_refactor/",
    "../../packages/registry-ui-duckui/"
  ],
  "exclude": ["dist"]
}

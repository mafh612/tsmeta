<p align="center">
  <a href="https://npmcharts.com/compare/tsmeta?minimal=true"><img src="https://img.shields.io/npm/dm/tsmeta.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/tsmeta"><img src="https://img.shields.io/npm/v/tsmeta.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/tsmeta"><img src="https://img.shields.io/npm/l/tsmeta.svg" alt="License"></a>
</p>

# tsmeta
<img width="100" height="100" src="https://github.com/mafh612/tsmeta/blob/master/logo/logo.png" title="tsmeta" />

## Contents
- [install](#user-content-install)
- [intend](#user-content-intend)
- [tsmeta.config.json](#tsmeta.config.json)
- [GraphQL examples](/README_graphql.md)
- [OpenAPI examples](/README_oas.md)
- [sigmajs examples](/README_sigma.md)

## install
```
npm i tsmeta
```

## intend
_tsmeta_ can create schemas for either documentation of your RestAPI as well as the needed schemas for your GraphqlAPI of your typescript node application. Using simply typescript classes and a few annotations.
- _tsmeta_: can only be used for typescript projects
- _tsmeta_: create schema and data files for these applications:
  - __[OpenAPI Specification 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md)__
  - __[GraphQL](https://graphql.org/)__
  - __[sigmajs](http://sigmajs.org/)__

## tsmeta.config.json
to run _tsmeta_ a `tsmeta.config.json` file is required in the root of your project.
the basic `tsmeta.config.json` has to include the base-package reference (`package.json`)
```json
{
  "basePackage": "package.json",
  "scanAdditionalPackages": {},
  "showScannedFiles": false,
  "showWrittenFiles": true,
  "metaConfig": {},
  "sigmaConfig": {},
  "oasConfig": {},
  "graphQLConfig": {}
}
```
your `package.json` has to include the `source` property like:
```json
{
  "main": "dist/index.js",
  "source": "src/index.ts",
}
```
### metaConfig
the `tsmetaConfig` object is required in your `tsmeta.config.json`, however creation of the `tsmeta.output.json` file is not required to generate the other schemas
```json
{
  "create": true,
  "outputPath": "schema",
  "outputFilename": "tsmeta.output.json",
  "compilerOptions": "tsconfig.json"
}
```

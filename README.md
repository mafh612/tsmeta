# tsmeta

<p align="center">
  <a href="https://npmcharts.com/compare/tsmeta?minimal=true"><img src="https://img.shields.io/npm/dm/tsmeta.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/tsmeta"><img src="https://img.shields.io/npm/v/tsmeta.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/tsmeta"><img src="https://img.shields.io/npm/l/tsmeta.svg" alt="License"></a>
</p>

## Contents
- [version](#version)
- [install](#install)
- [intend](#intend)
- [tsmeta.config.json](#tsmeta.config.json)
  - [metaConfig](#metaConfig)
  - [sigmaConfig](#sigmaConfig)
  - [oasConfig](#oasConfig)
  - [graphQLConfig](#graphQLConfig)
- [openapi annotations](#openapi_annotations)
  - [class annotations](#class_annotations)
  - [method annotations](#method_annotations)
  - [property annotations](#property_annotations)

## install
```
npm i tsmeta
```

## intend

- _tsmeta_: only for typescript projects
- _tsmeta_: create schema and data files for these applications:
  - __[OpenAPI Specification 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md)__
  - __[GraphQL](https://graphql.org/)__
  - __[sigmajs](http://sigmajs.org/)__ _(data creation to use in sigmajs is still under development)_

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
### metaConfig
```json
{
  "create": true,
  "outputPath": "schema",
  "outputFilename": "tsmeta.output.json",
  "compilerOptions": "tsconfig.json"
}
```
### sigmaConfig
```json
{
  "create": true,
  "outputPath": "schema",
  "outputFilename": "tsmeta.output.json",
  "compilerOptions": "tsconfig.json"
}
```
### oasConfig
```json
{
  "create": true,
  "outputPath": "schema",
  "outputFilename": "oas.output.json",
  "openapistring": "3.0.1",
  "annotationsMap": {
    "Body": "RequestBody",
    "QueryParam": "RequestParam",
    "Get": "RequestGet"
  }
}
```
### graphQLConfig
```json
{
  "create": true,
  "outputPath": "schema",
  "model_annotation": "Model",
  "property_annotation": "Property"
}
```

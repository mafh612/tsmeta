"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_enum_1 = require("../lib/enums/annotations.enum");
const typescript_types_enum_1 = require("../lib/enums/typescript.types.enum");
const api_build_value_1 = require("./api.build.value");
const api_extract_mains_1 = require("./api.extract.mains");
const literals = ['boolean', 'number', 'string'];
let tsMains;
/**
 * generateExample from class or interface
 */
const generateExample = (exampleName, tsMetaJson, buildPath = '', exampleModelName) => {
    buildPath += `^${exampleName}$`;
    let tsModelMain;
    if (!tsMains)
        tsMains = api_extract_mains_1.ExtractMains(tsMetaJson);
    const tsMain = tsMains.find((item) => item.name === exampleName);
    if (exampleModelName) {
        tsModelMain = tsMains.find((item) => item.name === exampleModelName);
    }
    const example = {};
    const repeated = buildPath.indexOf(`^${exampleName}$`) !== buildPath.lastIndexOf(`^${exampleName}$`);
    if (!tsMain)
        return undefined;
    tsMain.properties.forEach((tsProperty) => {
        const tsDecorator = tsProperty.decorators
            ? tsProperty.decorators.find((it) => it.name === annotations_enum_1.AnnotationsEnum.PROPERTY)
            : undefined;
        let tsModelDecorator;
        if (tsModelMain) {
            const tsModelProperty = tsModelMain.properties && tsModelMain.properties
                .find((item) => item.name === tsProperty.name);
            tsModelDecorator = tsModelProperty && tsModelProperty.decorators && tsModelProperty.decorators
                .find((item) => item.name === annotations_enum_1.AnnotationsEnum.PROPERTY);
        }
        switch (tsProperty.tstype.typescriptType) {
            case typescript_types_enum_1.TypescriptTypes.BASIC:
                example[tsProperty.name] = api_build_value_1.BuildValue(tsProperty.tstype.basicType, tsDecorator, tsModelDecorator);
                break;
            case typescript_types_enum_1.TypescriptTypes.MULTIPLE:
                example[tsProperty.name] = api_build_value_1.BuildValue(tsProperty.tstype.basicType[0], tsDecorator, tsModelDecorator);
                break;
            case typescript_types_enum_1.TypescriptTypes.ARRAY:
                if (repeated) {
                    example[tsProperty.name] = [];
                }
                else if (tsProperty.tstype.basicType === 'array' && literals.includes(tsProperty.tstype.valueType)) {
                    example[tsProperty.name] = [[api_build_value_1.BuildValue(tsProperty.tstype.valueType, tsDecorator, tsModelDecorator)]];
                }
                else if (tsProperty.tstype.basicType === 'array' && !literals.includes(tsProperty.tstype.valueType)) {
                    example[tsProperty.name] = [[generateExample(tsProperty.tstype.valueType, tsMetaJson, buildPath)]];
                }
                else if (literals.includes(tsProperty.tstype.basicType)) {
                    example[tsProperty.name] = [api_build_value_1.BuildValue(tsProperty.tstype.basicType, tsDecorator, tsModelDecorator)];
                }
                else
                    example[tsProperty.name] = [generateExample(tsProperty.tstype.basicType, tsMetaJson, buildPath)];
                break;
            case typescript_types_enum_1.TypescriptTypes.MAP:
                if (literals.includes(tsProperty.tstype.valueType)) {
                    example[tsProperty.name] = { key: api_build_value_1.BuildValue(tsProperty.tstype.valueType, tsDecorator, tsModelDecorator) };
                }
                else if (repeated) {
                    example[tsProperty.name] = {};
                }
                else
                    example[tsProperty.name] = { key: generateExample(tsProperty.tstype.valueType, tsMetaJson, buildPath) };
                break;
            case typescript_types_enum_1.TypescriptTypes.REFERENCE:
                if (repeated)
                    example[tsProperty.name] = {};
                else
                    example[tsProperty.name] = generateExample(tsProperty.tstype.basicType, tsMetaJson, buildPath);
                break;
            default:
                process.stdout.write(`could not generate example for type |${tsProperty.tstype.typescriptType}| of property |${tsProperty.name}|`);
        }
    });
    return example;
};
exports.GenerateExample = generateExample;
//# sourceMappingURL=api.generate.example.js.map
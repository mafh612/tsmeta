"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_types_enum_1 = require("../lib/enums/typescript.types.enum");
const api_build_value_1 = require("./api.build.value");
const api_extract_mains_1 = require("./api.extract.mains");
let tsMains;
/**
 * generateExample from class or interface
 */
const generateMalformedExample = (exampleName, tsMetaJson) => {
    if (!tsMains)
        tsMains = api_extract_mains_1.ExtractMains(tsMetaJson);
    const tsMain = tsMains.find((item) => item.name === exampleName);
    const example = {};
    if (!tsMain)
        return undefined;
    tsMain.properties.forEach((tsProperty) => {
        const tsDecorator = tsProperty.decorators
            ? tsProperty.decorators.find((it) => it.name === 'Property')
            : undefined;
        switch (tsProperty.tstype.typescriptType) {
            case typescript_types_enum_1.TypescriptTypes.BASIC:
                example[tsProperty.name] = api_build_value_1.BuildMalformedValue(tsProperty.tstype.basicType, tsDecorator);
                break;
            case typescript_types_enum_1.TypescriptTypes.MULTIPLE:
                example[tsProperty.name] = api_build_value_1.BuildMalformedValue(tsProperty.tstype.basicType[0], tsDecorator);
                break;
            case typescript_types_enum_1.TypescriptTypes.ARRAY:
                example[tsProperty.name] = true;
                break;
            case typescript_types_enum_1.TypescriptTypes.MAP:
                example[tsProperty.name] = true;
                break;
            case typescript_types_enum_1.TypescriptTypes.REFERENCE:
                example[tsProperty.name] = true;
                break;
            default:
                process.stdout.write(`could not generate example for type |${tsProperty.tstype.typescriptType}| of property |${tsProperty.name}|`);
        }
    });
    return example;
};
exports.GenerateMalformedExample = generateMalformedExample;
//# sourceMappingURL=api.generate.malformed.example.js.map
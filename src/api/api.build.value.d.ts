import { TsDecorator } from '../lib';
/**
 * build value by literal types
 */
declare const buildValue: (propertyType: string, decorator: TsDecorator, modelDecorator: TsDecorator) => boolean | number | string;
declare const buildMalformedValue: (propertyType: string, decorator: TsDecorator) => boolean | number | string;
export { buildValue as BuildValue, buildMalformedValue as BuildMalformedValue };
//# sourceMappingURL=api.build.value.d.ts.map
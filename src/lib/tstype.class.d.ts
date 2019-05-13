import { TypescriptTypes } from './enums/typescript.types.enum';
import { TsType } from './interfaces/tsmeta.schema';
/**
 * class TsTypeFactory
 */
declare class TsTypeClass implements TsType {
    representation?: string;
    basicType: string | string[];
    keyType?: string | string[];
    valueType?: string | string[];
    typescriptType: TypescriptTypes;
    constructor(tsType: TsType);
    /**
     * create representation from type strings
     */
    createRepresentation(): void;
}
export { TsTypeClass };
//# sourceMappingURL=tstype.class.d.ts.map
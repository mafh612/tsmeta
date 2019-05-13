import { ArrayTypeNode, IndexSignatureDeclaration, TypeElement, TypeNode, UnionTypeNode } from 'typescript';
import { TsType } from '../interfaces/tsmeta.schema';
/**
 * extract TsType from TypeNode
 */
declare const typeNodeToTsType: (typeNode: TypeNode | TypeElement | IndexSignatureDeclaration | ArrayTypeNode | UnionTypeNode) => TsType;
export { typeNodeToTsType as TypeNodeToTsType };
//# sourceMappingURL=type.node.to.ts.type.d.ts.map
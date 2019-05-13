import { SigmaData } from '../../lib/interfaces/sigma';
import { TsClass } from '../../lib/interfaces/tsmeta.schema';
/**
 * SigmaClassesGenerator class
 */
declare class SigmaClassesGenerator {
    private readonly sigmaNodeGenerator;
    private readonly sigmaEdgeGenerator;
    /**
     * generate from TsClass
     */
    generate(tsClass: TsClass): SigmaData;
}
export { SigmaClassesGenerator };
//# sourceMappingURL=sigma.classes.generator.d.ts.map
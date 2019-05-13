import { SigmaData } from '../../lib/interfaces/sigma';
import { TsMain } from '../../lib/interfaces/tsmeta.schema';
/**
 * SigmaClassesGenerator class
 */
declare class SigmaInterfacesGenerator {
    private readonly sigmaNodeGenerator;
    private readonly sigmaEdgeGenerator;
    /**
     * generate from TsMain
     */
    generate(tsMain: TsMain): SigmaData;
}
export { SigmaInterfacesGenerator };
//# sourceMappingURL=sigma.interfaces.generator.d.ts.map
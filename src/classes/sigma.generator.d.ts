import { SigmaData } from '../lib/interfaces/sigma';
import { SigmaConfig } from '../lib/interfaces/tsmeta.config';
import { TsMeta } from '../lib/interfaces/tsmeta.schema';
/**
 * class SigmaGenerator
 */
declare class SigmaGenerator {
    private readonly sigmaConfig;
    private readonly sigmaNodeGenerator;
    private readonly sigmaFilesGenerator;
    private readonly sigmaClassesGenerator;
    private readonly sigmaInterfacesGenerator;
    private nodes;
    private edges;
    constructor(sigmaConfig: SigmaConfig);
    /**
     * generate SigmaData container
     */
    generate(tsMeta: TsMeta): SigmaData;
    /**
     * collect TsFiles from tsMeta schema
     */
    private filesFromMeta;
    /**
     * collect TsClasses from tsMeta schema
     */
    private classesFromMeta;
    /**
     * collect TsMains from tsMeta schema
     */
    private mainsFromMeta;
    /**
     * calculate all edges
     */
    private calculateEdges;
    /**
     * calculate nodes
     */
    private calculateNodes;
}
export { SigmaGenerator };
//# sourceMappingURL=sigma.generator.d.ts.map
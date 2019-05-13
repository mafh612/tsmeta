import { SigmaData } from '../../lib/interfaces/sigma';
import { TsFile } from '../../lib/interfaces/tsmeta.schema';
/**
 * SigmaFilesGenerator class
 */
declare class SigmaFilesGenerator {
    private readonly sigmaNodeGenerator;
    private readonly sigmaEdgeGenerator;
    /**
     * generate from TsFile
     */
    generate(tsFile: TsFile): SigmaData;
}
export { SigmaFilesGenerator };
//# sourceMappingURL=sigma.files.generator.d.ts.map
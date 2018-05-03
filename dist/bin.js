"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable no-console
const fs_1 = require("fs");
const tsmeta_factory_1 = require("./classes/tsmeta.factory");
/**
 * class TsMeta
 */
class TsMetaExecution {
    constructor() {
        this.tsMetaConfig = this.loadConfigFile();
        this.tsMeta = this.createTsMetaSchema();
        // console.log(`TsMeta\n${this.tsMeta}`) // tslint:disable-line
        console.log(`TsMeta\n${JSON.stringify(this.tsMeta, undefined, 2)}`); // tslint:disable-line
    }
    /**
     * load config from tsmeta.config.json
     */
    loadConfigFile() {
        try {
            return JSON.parse(fs_1.readFileSync('tsmeta.config.json', { encoding: 'utf8' }));
        }
        catch (_a) {
            console.error('failed to load config file');
        }
    }
    /**
     * use factories to create tsMetaSchema
     */
    createTsMetaSchema() {
        this.tsMetaFactory = new tsmeta_factory_1.TsMetaFactory();
        return this.tsMetaFactory.build(this.tsMetaConfig);
    }
}
!new TsMetaExecution(); // tslint:disable-line no-unused-expression

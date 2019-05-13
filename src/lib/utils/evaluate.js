"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * string eval
 */
const evaluate = (forEvaluation) => {
    let evaluated;
    try {
        evaluated = eval(`() => { return ${forEvaluation}}`)(); // tslint:disable-line
    }
    catch (err) {
        process.stderr.write(err.toString());
    }
    return evaluated;
};
exports.Evaluate = evaluate;
//# sourceMappingURL=evaluate.js.map
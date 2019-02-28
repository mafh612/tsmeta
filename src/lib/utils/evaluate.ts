/**
 * string eval
 */
const evaluate: ((forEvaluation: string) => any) = (forEvaluation: string): any => {
  let evaluated: any
  try {
    evaluated = eval(`() => { return ${forEvaluation}}`)() // tslint:disable-line
  } catch (err) {
    process.stderr.write(err.toString())
  }

  return evaluated
}

export {
  evaluate as Evaluate
}

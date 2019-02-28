import { Identifier, ObjectLiteralExpression, PropertyAssignment } from 'typescript'
import { getSourceFile } from '../source.file.container'
import { Evaluate } from './evaluate'
import { IdentifierToString } from './identifier.to.string'
import { InitializerToString } from './initializer.to.string'

/**
 * extract text from ObjectLiteralExpression
 * @param expression<ObjectLiteralExpression>
 */
const objectLiteralExpressionToString: ((expression: ObjectLiteralExpression) => any)
  = (expression: ObjectLiteralExpression): any => {
    const expressionString: string = expression.getFullText(getSourceFile())
    let obj: { [key: string]: any } = {}

    try {
      obj = Evaluate(expressionString)
    } catch {
      expression.properties.forEach((propertyAssignment: PropertyAssignment): any => {
        obj[IdentifierToString(propertyAssignment.name as Identifier)] = InitializerToString(propertyAssignment.initializer)
      })
    }

    return obj
}

export {
  objectLiteralExpressionToString as ObjectLiteralExpressionToString
}

# GraphQL Examples
## Model
```typescript
import { Model, Property } from 'tsmeta'
import { SimpleMock } from './simple.mock'

/**
 * class SomethingMock
 */
@Model
class SomethingMock {

  public whatever: any
  public indifferent: boolean|number|string|SimpleMock
  public truth: boolean
  public count: number
  @Property({ format: float }) public probable: number
  public text: string
  public much: string[]
  public muchOther: SimpleMock[]
  public that: { [key: string]: string }
  public thatOther: { [key: string]: SimpleMock }
  public mapped: Map<string, string>
  public mappedOther: Map<string, SimpleMock>
  public dump: string[][]

  ...
}

export { SomethingMock }
```
## GraphQL type
```graphql
type SomethingMock {
  whatever: Any
  indifferent: Any
  truth: Boolean
  count: Int
  probable: Float
  text: String
  much: [String]
  muchOther: [SimpleMock]
  that(key: String): String
  thatOther(key: String): SimpleMock
  mapped(key: String): String
  mappedOther(key: String): SimpleMock
  dump: [[String]]
}
```

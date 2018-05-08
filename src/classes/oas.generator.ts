import { Components, Info, Openapi, PathItem, SecurityRequirement, Server, Tag } from '../resources/openapispec'
import { OasConfig } from '../resources/tsmeta.config'
import { TsMeta } from '../resources/tsmeta.schema'

/**
 * class OasGenerator
 */
class OasGenerator {

  /**
   * generate openapi specification
   */
  public generator(tsMeta: TsMeta, oasConfig: OasConfig): Openapi {
    const components: Components = undefined
    const info: Info = undefined
    const paths: { [key: string]: PathItem } = undefined
    const openapi: string = undefined
    const security: SecurityRequirement[] = undefined
    const servers: Server[] = undefined
    const tags: Tag[] = undefined

    return {
      components,
      info,
      paths,
      openapi,
      security,
      servers,
      tags
    }
  }
}

export { OasGenerator }

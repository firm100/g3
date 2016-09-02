import * as _ from 'lodash'
import * as models from '../../models'

export function toComponentName(name: string): string {
  if (models.Const.DEFAULT_TAG_NAMES_LOWER.indexOf(name.toLowerCase()) !== -1) {
    return models.Const.DEFAULT_TAG_NAMES[models.Const.DEFAULT_TAG_NAMES_LOWER.indexOf(name.toLowerCase())]
  }
  //return _.upperFirst(_.camelCase(name))
  return name.toUpperCase()
}

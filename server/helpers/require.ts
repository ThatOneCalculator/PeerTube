import { join } from 'path'
import { root } from '@shared/core-utils'

function requireConfig () {
  if (typeof __non_webpack_require__ !== 'undefined') return __non_webpack_require__('config')

  return require('config')
}

function requirePackageJSON () {
  if (typeof __non_webpack_require__ !== 'undefined') return __non_webpack_require__(join(root(), 'package.json'))

  return require(join(root(), 'package.json'))
}

export {
  requireConfig,
  requirePackageJSON
}

// Thanks: https://github.com/dwyl/decache
// We reuse this file to also uncache plugin base path

import { extname } from 'path'

function decachePlugin (pluginPath: string, libraryPath: string) {
  const moduleName = find(libraryPath)

  if (!moduleName) return

  searchCache(moduleName, function (mod) {
    delete __non_webpack_require__.cache[mod.id]
  })

  removeCachedPath(pluginPath)
}

function decacheModule (name: string) {
  const moduleName = find(name)

  if (!moduleName) return

  searchCache(moduleName, function (mod) {
    delete __non_webpack_require__.cache[mod.id]
  })

  removeCachedPath(moduleName)
}

// ---------------------------------------------------------------------------

export {
  decacheModule,
  decachePlugin
}

// ---------------------------------------------------------------------------

function find (moduleName: string) {
  try {
    return __non_webpack_require__.resolve(moduleName)
  } catch {
    return ''
  }
}

function searchCache (moduleName: string, callback: (current: NodeModule) => void) {
  const resolvedModule = __non_webpack_require__.resolve(moduleName)
  let mod: NodeModule
  const visited = {}

  if (resolvedModule && ((mod = __non_webpack_require__.cache[resolvedModule]) !== undefined)) {
    // Recursively go over the results
    (function run (current) {
      visited[current.id] = true

      current.children.forEach(function (child) {
        if (extname(child.filename) !== '.node' && !visited[child.id]) {
          run(child)
        }
      })

      // Call the specified callback providing the
      // found module
      callback(current)
    })(mod)
  }
};

function removeCachedPath (pluginPath: string) {
  const pathCache = __non_webpack_require__.main.constructor._pathCache

  Object.keys(pathCache).forEach(function (cacheKey) {
    if (cacheKey.includes(pluginPath)) {
      delete pathCache[cacheKey]
    }
  })
}

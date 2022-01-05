const commonTSConfig = require('./shared/common-ts-config')
const path = require('path')

const distPath = path.resolve(__dirname, '..', 'dist')

const toolFiles = [
  'cli',
  'peertube-auth',
  'peertube-get-access-token',
  'peertube-import-videos',
  'peertube-plugins',
  'peertube-redundancy',
  'peertube-upload',
  'peertube'
]

const tools = env => commonTSConfig.getCommonTSConfig(env, {
  entry: toolFiles.reduce((p, c) => ({ ...p, [c]: `./server/tools/${c}.ts` }), {}),
  tsConfig: './server/tools/tsconfig.json',

  output: {
    filename: '[name].js',
    path: path.join(distPath, 'server', 'tools')
  }
})

module.exports = env => {
  return [ tools(env) ]
}

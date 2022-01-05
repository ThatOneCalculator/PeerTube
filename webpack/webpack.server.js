const commonTSConfig = require('./shared/common-ts-config')
const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

const distPath = path.resolve(__dirname, '..', 'dist')

const server = env => {
  const plugins = []

  if (env.target === 'development') {
    plugins.push(
      new NodemonPlugin({
        env: {
          NODE_ENV: 'test',
        },
        watch: distPath,
        ext: 'js',

        delay: '1000'
      })
    )
  }

  return commonTSConfig.getCommonTSConfig(env, {
    entry: './server.ts',
    tsConfig: './tsconfig.json',

    output: {
      filename: 'server.js',
      path: distPath
    }
  })
}

const scriptFiles = [
  'benchmark',
  'client-build-stats',
  'create-import-video-file-job',
  'create-move-video-storage-job',
  'create-transcoding-job',
  'generate-code-contributors',
  'i18n/create-custom-files',
  'migrations/peertube-2.1',
  'migrations/peertube-4.0',
  'parse-log',
  'plugin/install',
  'plugin/uninstall',
  'print-transcode-command',
  'prune-storage',
  'regenerate-thumbnails',
  'reset-password',
  'update-host'
]

const scripts = env => commonTSConfig.getCommonTSConfig(env, {
  entry: scriptFiles.reduce((p, c) => ({ ...p, [c]: `./scripts/${c}.ts` }), {}),
  tsConfig: './scripts/tsconfig.json',

  output: {
    filename: '[name].js',
    path: path.join(distPath, 'scripts')
  }
})

module.exports = env => {
  return [ server(env), scripts(env) ]
}

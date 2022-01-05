const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const basePlugins = [
  new webpack.ContextReplacementPlugin(
    /helpers/, // for require.ts
    data => {
      delete data.dependencies[0].critical

      return data
    }
  )
]

function getCommonTSConfig(env, options) {
  return {
    entry: options.entry,
    output: options.output,
    plugins: basePlugins.concat(options.plugins || []),

    mode: 'none',

    devtool: env.target === 'production'
      ? 'source-map'
      : 'eval-cheap-module-source-map',

    target: 'node',
    externalsPresets: { node: true },
    externals: [
      nodeExternals()
    ],

    cache: {
      type: 'memory'
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // Can't use transpile only with https://github.com/TypeStrong/ts-loader/issues/331
                transpileOnly: false,
                projectReferences: true,
                logLevel: 'info'
              }
            }
          ]
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],

      plugins: [
        new TsconfigPathsPlugin({
          configFile: options.tsConfig,
          logLevel: 'info'
        })
      ]
    },

    watchOptions: {
      ignored: [
        '**/node_modules',
        '**/*.js',
        '**/*.d.ts'
      ]
    }
  }
}

module.exports = {
  getCommonTSConfig
}

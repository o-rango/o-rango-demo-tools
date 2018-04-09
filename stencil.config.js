// Plugins
const sass = require('@stencil/sass');
const postcss = require('@stencil/postcss');
const autoprefixer = require('autoprefixer');

exports.config = {
  enableCache: false,
  namespace: 'orango-demo-tools',
  outputTargets: [
    {
      type: 'dist',
      serviceWorker: false
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ],
  plugins: [
    sass({
      includePaths: [ 'node_modules/' ],
      injectGlobalPaths: [
        'src/components/styles/global.scss'
      ]
    }),
    postcss({
      plugins: [
        autoprefixer({
          browsers: [
            'last 2 versions',
            'iOS >= 8',
            'Android >= 4.4',
            'Explorer >= 11',
            'ExplorerMobile >= 11'
          ],
          cascade: false
        })
      ]
    })
  ],
  preamble: 'O-RANGO - MIT License',
};

exports.devServer = {
  root: 'www',
  watchGlob: [ '**/**', 'src/**/*.html' ]
};

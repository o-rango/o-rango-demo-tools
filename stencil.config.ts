import { postcss } from '@stencil/postcss';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
const autoprefixer =  require('autoprefixer');

export const config: Config = {
  namespace: 'orango-demo-tools',
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/']
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
  globalStyle: 'src/components/styles/global.scss',
  outputTargets: [
    { type: 'www' , serviceWorker : null},
    { type: 'dist',  },
    { type: 'stats',  file: 'stats.json'}
  ]
};

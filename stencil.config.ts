import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import * as autoprefixer from 'autoprefixer';

export const config: Config = {
  enableCache: true,
  namespace: 'orango-demo-tools',
  outputTargets: [
    {
      type: 'dist',
      serviceWorker: false
    },
    {
      type: 'www',
      dir :'docs',
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

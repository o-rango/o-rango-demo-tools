exports.config = {
  namespace: 'orango-demo-tools',
  generateDistribution: true,
  generateWWW: true,
  bundles: [
    {
      components: [
        'o-demo-bar',
        'o-demo-bar-toolbar',
        'o-demo-bar-select',
        'o-demo-bar-buttons',
        'o-demo-snackbar',
        'o-demo-devices',
        'o-demo-resizer'
      ]
    },
    { components: ['o-demo-case'] }
  ],
  collections: [],
  sassConfig: {
    includePaths: ['node_modules']
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};

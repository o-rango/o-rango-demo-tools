exports.config = {
  namespace: 'orango-demo-tools',
  generateDistribution: true,
  bundles: [
    { components: ['o-demo-bar' , 'o-demo-bar-toolbar' , 'o-demo-bar-select' , 'o-demo-bar-buttons' , 'o-demo-snackbar'] },
    { components: ['o-demo-case' , 'o-demo-devices'] }
  ],
  collections: [],
  sassConfig: {
    includePaths: ['node_modules']
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}

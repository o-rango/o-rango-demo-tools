exports.config = {
  namespace: 'orango-dev-tools',
  generateDistribution: false,
  bundles: [
    { components: ['o-demo-bar' , 'o-demo-bar-toolbar' , 'o-demo-bar-select'] },
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
}

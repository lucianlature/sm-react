function LogPlugin(options) {
  // Setup the plugin instance with options...
}

LogPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!'); 
  });
};

module.exports = LogPlugin;
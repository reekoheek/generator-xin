'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = Generator.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super ' + chalk.red('generator-xin') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Module name?',
        default: (() => {
          let val = path.basename(process.cwd());
          if (val.split('-').length <= 1) {
            val = 'xin-' + val;
          }
          return val;
        })(),
        validate(result) {
          return result.split('-').length > 1;
        }
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author?',
        default: this.user.git.name() + ' <' + this.user.git.email() + '>'
      }
    ];

    return this.prompt(prompts).then(props => {
      // console.log(props);
      this.props = props;
    });
  },

  writing() {
    this.genPackageJson();
    this.genWebpackConfig();
    this.genDemo();

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      this.props
    );
  },

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  },

  end() {
    this.log('');
    this.log('Run ' + chalk.yellow('yarn dev') + ' to start dev server and go to http://localhost:8080/demo/ to see demo');
    this.log('');
  },

  genPackageJson() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  },

  genWebpackConfig() {
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
  },

  genDemo() {
    this.fs.copyTpl(
      this.templatePath('demo/index.html'),
      this.destinationPath('demo/index.html'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('demo/_index.js'),
      this.destinationPath('demo/_index.js'),
      this.props
    );
  }
});

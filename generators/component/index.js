const Generator = require('yeoman-generator');
const chalk = require('chalk');

const camelize = s => (s[0].toUpperCase() + s.substr(1).replace(/-([a-z])/g, g => g[1].toUpperCase()));

module.exports = Generator.extend({
  prompting() {
    if (this.args[0]) {
      this.props = {
        name: this.args[0],
        className: camelize(this.args[0])
      };
      return;
    }

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?',
        validate(result) {
          return result.split('-').length > 1;
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      // console.log(props);
      this.props = props;
    });
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`${this.props.name}.js`),
      this.props
    );
  },

  end() {
    this.log('');
    this.log(`${chalk.yellow(this.props.name)} created.`);
    this.log('');
  }
});

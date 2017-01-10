import xin from 'xin';

class Component extends xin.Component {
  get template () {
    return 'Hello world!';
  }
}

xin.define('<%= name %>', Component);

export default Component;

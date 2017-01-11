import xin from 'xin';

class <%= className %> extends xin.Component {
  get template () {
    return 'Hello world!';
  }
}

xin.define('<%= name %>', <%= className %>);

export default <%= className %>;

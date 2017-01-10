import 'xin/components/fixture';

import '../';

((fixture) => {
  fixture.addEventListener('connected', () => {
    // do something about fixture when connected
  });
})(window.fixture);

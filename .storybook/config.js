import { configure } from '@kadira/storybook';

function loadStories() {
  require('../example');
}

configure(loadStories, module);

import {
  configure,
  addDecorator,
  StoryDecorator,
  addParameters
} from '@storybook/react'
import { withContexts } from '@storybook/addon-contexts/react'
import { i18nContexts } from './configs/contexts' // we will define the contextual setups later in API section

addParameters({
  options: {
    panelPosition: 'right'
  },
  info: {
    inline: true,
    header: false,
    styles: styles => ({
      ...styles,
      infoBody: {
        ...styles.infoBody,
        position: 'absolute',
        left: 8,
        right: 8
      }
    })
  }
})

// place after the info addon so that wrappers get removed
addDecorator(withContexts(i18nContexts) as StoryDecorator)

function loadStories() {
  const req = require.context('../src', true, /\.stories\.tsx$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

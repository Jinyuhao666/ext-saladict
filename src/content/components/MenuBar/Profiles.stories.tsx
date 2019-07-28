import React from 'react'
import i18next from 'i18next'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, select } from '@storybook/addon-knobs'
import {
  withLocalStyle,
  withi18nNS,
  withSaladictPanel
} from '@/_helpers/storybook'
import { Profiles } from './Profiles'

storiesOf('Content Scripts|Menubar', module)
  .addParameters({
    backgrounds: [
      { name: 'MenuBar', value: '#5caf9e', default: true },
      { name: 'Black', value: '#000' }
    ]
  })
  .addDecorator(
    withInfo({
      inline: true,
      header: false
    })
  )
  .addDecorator(withKnobs)
  .addDecorator(withSaladictPanel)
  .addDecorator(stroy => <div style={{ marginLeft: 50 }}>{stroy()}</div>)
  .addDecorator(withLocalStyle(require('./Profiles.scss')))
  .addDecorator(withLocalStyle(require('@/_sass_global/_reset.scss')))
  .addDecorator(withi18nNS('content'))
  .add('Profiles', () => {
    const profiles = Array.from(Array(5)).map((_, i) => ({
      id: `profile${i + 1}`,
      name: `Profile${i + 1}`
    }))

    const profilesOption = profiles.reduce((o, p) => {
      o[p.name] = p.id
      return o
    }, {})
    return (
      <Profiles
        t={i18next.getFixedT(i18next.language, ['content', 'common'])}
        profiles={profiles}
        activeProfileId={select(
          'Active Profile',
          profilesOption,
          profiles[0].id
        )}
      />
    )
  })

// @flow
import ShuffleImages from '../index.js'
import React from 'react'
import { storiesOf } from '@kadira/storybook'

storiesOf('Button', module)
  .add('with text', () => (
    <div style={{width: 350, height: 350}}>
      <ShuffleImages
        maxTimeout={2000}
        minTimeout={1000}
        images={[
          'http://placehold.it/350x150',
          'http://placehold.it/450x250?v=2',
          'http://placehold.it/550x6s50?v=3'
        ]}
    />
    </div>
  ))

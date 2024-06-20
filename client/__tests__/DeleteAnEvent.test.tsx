// @vitest-environment jsdom
import { setupApp } from './setup'
import { beforeAll, describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import nock from 'nock'

beforeAll(() => nock.disableNetConnect())

describe('Press Delete Button', () => {
  it('Delete an event', async () => {
    const scope = nock('http://localhost').get('/api/v1/events/1').reply(200, {
      id: 1,
      day: 'friday',
      time: '2pm - 3pm',
      name: 'Slushie Apocalypse I',
      locationId: 1,
      description:
        'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
    })

    const deleteScope = nock('http://localhost')
      .delete('/api/v1/events/1')
      .reply(200)

    const screen = setupApp('/events/1/edit')
    const delBtn = await screen.findByText('Delete event')
    await userEvent.click(delBtn)

    expect(scope.isDone()).toBe(true)
    expect(deleteScope.isDone()).toBe(true)
  })
})

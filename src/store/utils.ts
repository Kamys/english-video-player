import { Event } from 'effector/effector.cjs'
import { createEvent, createStore, forward, Store } from 'effector'

export const createSimpleStore = <T> (defaultValue: T): [Event<T>, Store<T>] => {
    const event = createEvent<T>()
    const store = createStore<T>(defaultValue)
    forward({ from: event, to: store })

    return [event, store]
}
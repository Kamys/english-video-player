import { combine, createEvent, createStore } from 'effector'

const setSubtitleDiff = createEvent<number>()
const setSubtitleIdDiff = createEvent<number>()

const subtitleDiff = createStore(0)
.on(setSubtitleDiff, (store, payload) => payload)

const subtitleIdDiff = createStore(0)
    .on(setSubtitleIdDiff, (store, payload) => payload)

const store = combine({ subtitleDiff, subtitleIdDiff })

export const $subtitleDiff = {
    action: {
        setSubtitleDiff,
        setSubtitleIdDiff,
    },
    store: store
}
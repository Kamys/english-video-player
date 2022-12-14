import { combine, createEvent, createStore } from 'effector'

const setCurrentMillisecond = createEvent<number>()
const setDuration = createEvent<number>()
const setVolume = createEvent<number>()
const onPause = createEvent()
const onPlay = createEvent()
const onTogglePlay = createEvent()

const isPlay = createStore<boolean>(false)
    .on(onPause, () => false)
    .on(onPlay, () => true)
    .on(onTogglePlay, (oldValue) => !oldValue)
const currentMillisecond = createStore<number>(0)
    .on(setCurrentMillisecond, (_, value) =>  value)
const duration = createStore<number>(0)
    .on(setDuration, (_, value) =>  value)
const volume = createStore<number>(0.5)
    .on(setVolume, (_, value) =>  value)

const store = combine({ isPlay, currentMillisecond, duration, volume })

export const $video = {
    action: {
        setCurrentMillisecond,
        setDuration,
        onPause,
        onPlay,
        onTogglePlay,
        setVolume,
    },
    store: store,
}
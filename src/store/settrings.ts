import { createEvent, createStore } from 'effector'

const onToggleShow = createEvent()
const onToggleSubtitleState = createEvent<keyof SettingsStore>()
const isShow = createStore(false)
    .on(onToggleShow, isShow => !isShow)

export enum SubtitleState {
    Never = "Never",
    Pause = "Pause",
    Always = "Always",
}

const getNextSubtitleState = (current: SubtitleState): SubtitleState => {
    let values = Object.values(SubtitleState)
    const nextIndex = values.indexOf(current) + 1
    if (nextIndex >= values.length) {
        return values[0]
    }
    return values[nextIndex]
}

export interface SettingsStore {
    foreign: SubtitleState,
    native: SubtitleState,
}

const settings = createStore<SettingsStore>({
    foreign: SubtitleState.Pause,
    native: SubtitleState.Pause,
})
    .on(onToggleSubtitleState, (settings, value) => ({
        ...settings,
        [value]: getNextSubtitleState(settings[value])
    }))

export const $settings = {
    store: {
        isShow,
        settings,
    },
    action: {
        onToggleShow,
        onToggleSubtitleState,
    },
}
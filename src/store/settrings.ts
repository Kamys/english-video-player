import { createEvent, createStore } from 'effector'

const onToggleShow = createEvent()
const onToggleDisplaySubtitles = createEvent<boolean>()
const onDisplayEnSubtitlesOnlyOnPause = createEvent<boolean>()
const onDisplayRusSubtitlesOnlyOnPause = createEvent<boolean>()
const isShow = createStore(false)
    .on(onToggleShow, isShow => !isShow)

interface SettingsStore {
    isDisplaySubtitles: boolean
    isDisplayEnSubtitlesOnlyOnPause: boolean
    isDisplayRusSubtitlesOnlyOnPause: boolean
}

const settings = createStore<SettingsStore>({
    isDisplaySubtitles: true,
    isDisplayEnSubtitlesOnlyOnPause: true,
    isDisplayRusSubtitlesOnlyOnPause: true,
})
    .on(onToggleDisplaySubtitles, (settings, value) => ({
        ...settings,
        isDisplaySubtitles: value
    }))
    .on(onDisplayEnSubtitlesOnlyOnPause, (settings, value) => ({
        ...settings,
        isDisplayEnSubtitlesOnlyOnPause: value
    }))
    .on(onDisplayRusSubtitlesOnlyOnPause, (settings, value) => ({
        ...settings,
        isDisplayRusSubtitlesOnlyOnPause: value
    }))

export const $settings = {
    store: {
        isShow,
        settings,
    },
    action: {
        onToggleShow,
        onToggleDisplaySubtitles,
        onDisplayEnSubtitlesOnlyOnPause,
        onDisplayRusSubtitlesOnlyOnPause
    },
}
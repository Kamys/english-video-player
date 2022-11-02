import { createEvent, createStore } from 'effector'

const onToggleShow = createEvent()
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

export const $settings = {
    store: {
        isShow,
        settings,
    },
    action: {
        onToggleShow,
    },
}
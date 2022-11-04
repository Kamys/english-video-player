import { createEvent, createStore } from 'effector'

interface SubtitleDiffStore {
    ru: number,
    en: number,
}

type SetSubtitleDiffParams = {
    diff: number,
    langKey: keyof SubtitleDiffStore
}

const setSubtitleDiff = createEvent<SetSubtitleDiffParams>()

const subtitle = createStore<SubtitleDiffStore>({ en: 0, ru: 0 })
.on(setSubtitleDiff, (store, payload) => ({ ...store, [payload.langKey]: payload.diff }))

export const $subtitleDiff = {
    action: {
        setSubtitleDiff,
    },
    store: subtitle
}
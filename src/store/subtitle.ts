import { createStore } from 'effector'
import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import { createEffect } from 'effector/effector.umd'
import axios from 'axios'
import * as subtitleParser from '@plussub/srt-vtt-parser'

export interface SubtitleStore {
    ru: Entry[],
    en: Entry[],
}

type LoadSubtitleParam = {
    link: string,
    langKey: keyof SubtitleStore
}

const loadSubtitle = createEffect<LoadSubtitleParam, Entry[]>(async (params) => {
    const response = await axios.get<string>(params.link)
    const result = subtitleParser.parse(response.data)
    return result.entries
})

const subtitle = createStore<SubtitleStore>({ en: [], ru: [] })
.on(loadSubtitle.done, (store, payload) => ({ ...store, [payload.params.langKey]: payload.result }))

export const $subtitle = {
    action: {
        loadSubtitle,
    },
    store: subtitle
}
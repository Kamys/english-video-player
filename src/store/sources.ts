import { combine, createEvent, createStore, forward } from 'effector'
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

const onSetVideoSrc = createEvent<string>()
const onLoadSubtitle = createEffect<LoadSubtitleParam, Entry[]>(async (params) => {
    const response = await axios.get<string>(params.link)
    const result = subtitleParser.parse(response.data)
    return result.entries
})

const subtitle = createStore<SubtitleStore>({ en: [], ru: [] })
.on(onLoadSubtitle.done, (store, payload) => ({ ...store, [payload.params.langKey]: payload.result }))

const videoSrc = createStore<string>(null)
forward({ from: onSetVideoSrc, to: videoSrc })

const store = combine({ subtitle, videoSrc })

export const $sources = {
    action: {
        onLoadSubtitle,
        onSetVideoSrc
    },
    store,
}
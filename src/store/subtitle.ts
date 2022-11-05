import { combine } from 'effector'
import { createSimpleStore } from './utils'

const [setSubtitleDiff, subtitleDiff] = createSimpleStore(0)
const [setSubtitleIdDiff, subtitleIdDiff] = createSimpleStore(0)
const [onToggleShowSettings, isShowSettings] = createSimpleStore(false)
onToggleShowSettings.watch(() => {
    console.log(onToggleShowSettings)
})

const store = combine({ subtitleDiff, subtitleIdDiff, isShowSettings })

export const $subtitle = {
    action: {
        setSubtitleDiff,
        setSubtitleIdDiff,
        onToggleShowSettings,
    },
    store: store,
}
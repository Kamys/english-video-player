import { combine, createEffect, createStore } from 'effector'
import translate from 'translate'

const onTranslate = createEffect<string, string>(async (text) => {
    if (!text) return null
    return await translate(text, 'ru')
})


const textForTranslate = createStore<string>(null)
    .on(onTranslate, (_, value) => value)
const translateResult = createStore<string>(null)
    .on(onTranslate.done, (_, params) => params.result)


const store = combine(textForTranslate, translateResult, (textForTranslate, translateResult) => {
    return { textForTranslate, translateResult }
})


export const $translate = {
    action: {
        onTranslate,
    },
    store,
}
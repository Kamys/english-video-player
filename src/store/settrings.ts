import { createEvent, createStore } from 'effector'

const onToggleShow = createEvent()
const isShow = createStore(false)
    .on(onToggleShow, isShow => !isShow)

export const $settings = {
    store: {
        isShow,
    },
    action: {
        onToggleShow,
    },
}
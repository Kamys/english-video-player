import { createEvent, createStore } from 'effector'
import { debounce } from 'lodash'
import { $video } from './video'

const onUserActivity = createEvent()
const hideInterface = createEvent()

const isInterfaceActive = createStore<boolean>(true)
    .on(hideInterface, () => {
        document.fullscreenElement?.requestPointerLock()
        return false
    })
    .on(onUserActivity, () => {
        document.exitPointerLock()
        return true
    })

const debounceHideInterface = debounce(() =>  hideInterface(), 3000)

onUserActivity.watch(() => {
    if (document.fullscreenElement && $video.store.getState().isPlay) {
        debounceHideInterface()
    }
})

export const $interfaceActivity = {
    store: isInterfaceActive,
    action: {
        onUserActivity,
    },
}
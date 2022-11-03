import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'

export const toggleFullScreenForElement = (element: HTMLElement) => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        return
    }

    // @ts-ignore
    if (document.webkitFullscreenElement) {
        // @ts-ignore
        document.webkitExitFullscreen();
        return
    }

    // @ts-ignore
    if (element.webkitRequestFullscreen) {
        // @ts-ignore
        element.webkitRequestFullscreen();
    } else {
        // @ts-ignore
        element.requestFullscreen();
    }
}

export const getSubtitle = (subtitles: Entry[], currentMillisecond: number) => {
    const findSubtitle = subtitles.find(subtitle => {
        if (!subtitle) {
            return false
        }
        return subtitle.from <= currentMillisecond + 150 && subtitle.to >= currentMillisecond
    })

    return findSubtitle?.text
}
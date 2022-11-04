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

export const getSubtitleText = (subtitles: Entry[], currentMillisecond: number, diff: number) => {
    return getSubtitle(subtitles, currentMillisecond, diff)?.text
}

export const getSubtitle = (subtitles: Entry[], currentMillisecond: number, diff: number) => {
    return subtitles.find(subtitle => {
        if (!subtitle) {
            return false
        }
        console.log(currentMillisecond, diff)
        const from = subtitle.from + diff
        let to = subtitle.to + diff
        return from <= currentMillisecond && to >= currentMillisecond
    })
}
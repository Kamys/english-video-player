import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import dayjs from 'dayjs'

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
        let currentMillisecondWithDuff = currentMillisecond + diff
        return subtitle.from <= currentMillisecondWithDuff && subtitle.to >= currentMillisecondWithDuff
    })
}

export const toTime = (millisecond: number): string => {
    return dayjs().startOf("day").add(millisecond, 'milliseconds').format('mm:ss')
}
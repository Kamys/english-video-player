import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import dayjs from 'dayjs'
import { $sources, SubtitleStore } from './store/sources'
import { useStore } from 'effector-react'
import { $subtitle } from './store/subtitle'
import { $video } from './store/video'
import { useMemo } from 'react'

export const toggleFullScreenForElement = (element: HTMLElement) => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
        return
    }

    // @ts-ignore
    if (document.webkitFullscreenElement) {
        // @ts-ignore
        document.webkitExitFullscreen()
        return
    }

    // @ts-ignore
    if (element.webkitRequestFullscreen) {
        // @ts-ignore
        element.webkitRequestFullscreen()
    } else {
        // @ts-ignore
        element.requestFullscreen()
    }
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
    return dayjs().startOf('day').add(millisecond, 'milliseconds').format('mm:ss')
}

export const useCurrentSubtitle = (langKey: keyof SubtitleStore): Entry => {
    const { subtitleDiff, subtitleIdDiff } = useStore($subtitle.store)
    const { currentMillisecond } = useStore($video.store)
    const { ru, en } = useStore($sources.store).subtitle

    return useMemo(() => {
        const currentEnSubtitle = getSubtitle(en, currentMillisecond, subtitleDiff)
        if (langKey === 'en') {
            return currentEnSubtitle
        }
        const ruSubtitleID = parseInt(currentEnSubtitle?.id) + subtitleIdDiff

        return ru.find(s => parseInt(s.id) === ruSubtitleID)
    }, [currentMillisecond, ru, en, subtitleDiff, subtitleIdDiff])
}

export const ROUTS = {
    SELECT_VIDEO: '/',
    VIDEO: '/video',
}
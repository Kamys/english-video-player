import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import dayjs from 'dayjs'
import { $sources, SubtitleStore } from './store/sources'
import { useStore } from 'effector-react'
import { $subtitle } from './store/subtitle'
import { $video } from './store/video'
import { useEffect, useMemo } from 'react'
import { $interfaceActivity } from './store/interfaceActivity'

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

export const getSubtitle = (subtitles: Entry[], currentMillisecond: number, diff: number): Entry => {
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

export const toMinute = (millisecond: number): number => {
    return toSecond(millisecond) / 60
}


export const toSecond = (millisecond: number): number => {
    return millisecond / 1000
}

export const getNextSubStartTime = (currentTimeMilliseconds: number, subtitleDiff: number): number => {
    const subtitle = $sources.store.getState().subtitle.en
    const timeCods = subtitle.map(item => item.from)
    let currentTime = currentTimeMilliseconds + subtitleDiff
    const sort = timeCods.filter(timeCod => timeCod > currentTime).sort((a, b) => a - b)
    return sort[0]
}

export const getLastSubStartTime = (currentTimeMilliseconds: number, subtitleDiff: number): number => {
    const subtitle = $sources.store.getState().subtitle.en
    const currentSubtitle = getSubtitle(subtitle, currentTimeMilliseconds, 0)
    let currentTime = currentTimeMilliseconds + subtitleDiff
    if (currentSubtitle != null) {
        currentTime = currentSubtitle.from - 1
    }
    const timeCods = subtitle.map(item => item.from)
    const sort = timeCods.filter(timeCod => timeCod < currentTime).sort((a, b) => a - b).reverse()
    return sort[0]
}

export const getLastSub = (subtitles: Entry[], currentTimeMilliseconds: number): Entry => {
    const sort = subtitles.filter(timeCod => timeCod.from < currentTimeMilliseconds)
        .sort((a, b) => a.from - b.from)
        .reverse()
    return sort[0]
}

export const useCurrentSubtitle = (langKey: keyof SubtitleStore): Entry => {
    const { subtitleDiff, subtitleIdDiff } = useStore($subtitle.store)
    const { currentMillisecond } = useStore($video.store)
    const subtitle = useStore($sources.store).subtitle[langKey]

    return useMemo(() => {
        return getLastSub(subtitle, currentMillisecond + subtitleDiff)
    }, [currentMillisecond, subtitle, subtitleDiff, subtitleIdDiff])
}

export const useActivity = () => {
    const isPlay = useStore($video.store).isPlay

    useEffect(() => {
        const onUserActivity = () => {
            $interfaceActivity.action.onUserActivity()
        }

        window.addEventListener("mousemove", onUserActivity)
        window.addEventListener("keydown", onUserActivity)

        return () => {
            window.removeEventListener("mousemove", onUserActivity)
            window.removeEventListener("keydown", onUserActivity)
        }
    }, [isPlay])
}

export const ROUTS = {
    SELECT_VIDEO: '/',
    VIDEO: '/video',
}
import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $sources } from '../store/sources'
import { $video } from '../store/video'
import { $translate } from '../store/translate'
import { getLastSub, getNextSub } from '../utils'
import { $interfaceActivity } from '../store/interfaceActivity'

const { setCurrentMillisecond, setDuration, onTogglePlay } = $video.action

interface Props {
    goToTime: number
}

const useMove = (videoRef: MutableRefObject<HTMLVideoElement>) => {


    useEffect(() => {
        const onKeydown = (event) => {
            const isArrowRight = event.key === "ArrowRight" || event.code === "ArrowRight" || event.keyCode === 39
            const isArrowLeft = event.key === "ArrowLeft" || event.code === "ArrowLeft" || event.keyCode === 37

            if (isArrowRight) {
                let nextSub = getNextSub(videoRef.current.currentTime * 1000)
                videoRef.current.currentTime = nextSub / 1000
            }
            if (isArrowLeft) {
                videoRef.current.currentTime = getLastSub(videoRef.current.currentTime * 1000) / 1000
            }
        }
        window.addEventListener('keydown', onKeydown)

        return () => window.removeEventListener('keydown', onKeydown)
    }, [])
}

export const Video: React.FC<Props> = ({ goToTime }) => {
    const videoRef = useRef<HTMLVideoElement>()
    const { isPlay  } = useStore($video.store)
    const { videoSrc } = useStore($sources.store)

    useEffect(() => {
        const video = videoRef.current
        if (isPlay) {
            video.play()
            $translate.action.onTranslate(null)
        } else {
            video.pause()
        }
    }, [isPlay])

    useEffect(() => {
        videoRef.current.currentTime = goToTime / 1000
    }, [goToTime])

    useEffect(() => {
        let current = videoRef.current
        const onTimeupdate = () => {
            const millisecond = current.currentTime * 1000
            setCurrentMillisecond(millisecond)
            setDuration(current.duration * 1000)
        }
        current.addEventListener('timeupdate', onTimeupdate)

        return () => current.removeEventListener('timeupdate', onTimeupdate)
    }, [])

    useMove(videoRef)

    useEffect(() => {
        const onKeydown = (event) => {
            const isSpace = event.key === ' ' ||  event.code === 'Space' || event.keyCode === 32
            if (isSpace) {
                onTogglePlay()
                $interfaceActivity.action.onUserActivity()
                event.preventDefault()
                event.stopPropagation()
            }
        }
        window.addEventListener('keydown', onKeydown)

        return () => window.removeEventListener('keydown', onKeydown)
    }, [])

    const handleTogglePlay = useCallback(() => {
        onTogglePlay()
    }, [])

    return (
        <video onClick={handleTogglePlay} ref={videoRef} className='video' controls={false}>
            <source src={videoSrc} />
        </video>
    )
}
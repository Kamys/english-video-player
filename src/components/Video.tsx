import React, { useCallback, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $sources } from '../store/sources'
import { $video } from '../store/video'
import { $translate } from '../store/translate'

const { setCurrentMillisecond, setDuration, onTogglePlay } = $video.action

interface Props {
    goToTime: number
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

    useEffect(() => {
        const onKeydown = (event) => {
            const isSpace = event.key === ' ' ||  event.code === 'Space' || event.keyCode === 32
            if (isSpace) {
                onTogglePlay()
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
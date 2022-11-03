import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toggleFullScreenForElement } from '../utils'
import { Settings } from './Settings'
import * as Icon from 'react-bootstrap-icons'
import { Button, ProgressBar } from 'react-bootstrap'
import { $settings } from '../store/settrings'
import { SubtitleContainer } from './SubtitleContainer'
import { $translate } from '../store/translate'

interface Props {
    videoSrc: string
}

export const VideoContainer: React.FC<Props> = ({ videoSrc }) => {
    const [isPlay, setIsPlay] = useState(false)
    const [duration, setDuration] = useState<number>(0)
    const [currentMillisecond, setCurrentMillisecond] = useState(0)
    const videoContainerRef = useRef<HTMLDivElement>()
    const videoRef = useRef<HTMLVideoElement>()

    const togglePlay = useCallback(() => {
        const video = videoRef.current
        if (isPlay) {
            onPause()
        } else {
            video.play()
            setIsPlay(true)
            $translate.action.onTranslate(null)
        }
    }, [isPlay])

    const toggleFullScreen = useCallback(() => {
        const videoContainer = videoContainerRef.current
        toggleFullScreenForElement(videoContainer)
    }, [togglePlay])

    const moveVideoTo = useCallback((time: number) => {
        videoRef.current.currentTime = time / 1000
    }, [])

    const handleClickProgressBar = useCallback((event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percent = x / (event.currentTarget.clientWidth / 100)
        moveVideoTo((duration / 100) * percent)
    }, [duration])

    const onPause = useCallback(() => {
        const video = videoRef.current
        video.pause()
        setIsPlay(false)
    }, [])


    useEffect(() => {
        videoRef.current.addEventListener('timeupdate', () => {
            const millisecond = videoRef.current.currentTime * 1000
            setCurrentMillisecond(millisecond)
            setDuration(videoRef.current.duration * 1000)
        })
    }, [])

    useEffect(() => {
        const onKeydown = (event) => {
            if (event.key === ' ' ||
                event.code === 'Space' ||
                event.keyCode === 32) {
                togglePlay()
                event.preventDefault()
                event.stopPropagation()
            }
        }
        window.addEventListener('keydown', onKeydown)

        return () => window.removeEventListener('keydown', onKeydown)
    }, [togglePlay])

    const watchPoint = useMemo(() => {
        const onePercent = duration / 100
        return currentMillisecond / onePercent
    }, [duration, currentMillisecond])

    return (
        <div ref={videoContainerRef} className='video-container'>
            <SubtitleContainer
                isPlay={isPlay}
                onPause={onPause}
                currentMillisecond={currentMillisecond}
            />
            <Settings />
            <div className='video-controls'>
                <ProgressBar
                    onClick={handleClickProgressBar}
                    style={{ gridArea: 'progress-bar', cursor: 'pointer' }}
                    now={watchPoint}
                />
                <Button size='sm' variant='outline-dark' onClick={togglePlay}>
                    {isPlay ? <Icon.Stop color='white' /> : <Icon.Play color='white' />}
                </Button>
                <div></div>
                <Button size='sm' variant='outline-dark' onClick={() => $settings.action.onToggleShow()}>
                    <Icon.Gear color='white' />
                </Button>
                <Button className='pl-1' size='sm' variant='outline-dark' onClick={toggleFullScreen}>
                    <Icon.ArrowsFullscreen color='white' />
                </Button>
            </div>
            <video onClick={togglePlay} ref={videoRef} className='video' controls={false}>
                <source src={videoSrc} />
            </video>
        </div>
    )
}

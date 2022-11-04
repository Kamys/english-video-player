import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toggleFullScreenForElement } from '../utils'
import { Settings } from './Settings'
import * as Icon from 'react-bootstrap-icons'
import { Button, ProgressBar } from 'react-bootstrap'
import { $settings } from '../store/settrings'
import { SubtitleContainer } from './SubtitleContainer'
import { $translate } from '../store/translate'
import { useStore } from 'effector-react'
import { $video } from '../store/video'

interface Props {
    videoSrc: string
}

const { setCurrentMillisecond, setDuration, onTogglePlay } = $video.action

export const VideoContainer: React.FC<Props> = ({ videoSrc }) => {
    const { isPlay, currentMillisecond, duration } = useStore($video.store)
    const videoContainerRef = useRef<HTMLDivElement>()
    const videoRef = useRef<HTMLVideoElement>()

    useEffect(() => {
        const video = videoRef.current
        if (isPlay) {
            video.play()
            $translate.action.onTranslate(null)
        } else {
            video.pause()
        }
    }, [isPlay])

    const toggleFullScreen = useCallback(() => {
        const videoContainer = videoContainerRef.current
        toggleFullScreenForElement(videoContainer)
    }, [])

    const moveVideoTo = useCallback((time: number) => {
        videoRef.current.currentTime = time / 1000
    }, [])

    const handleClickProgressBar = useCallback((event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percent = x / (event.currentTarget.clientWidth / 100)
        moveVideoTo((duration / 100) * percent)
    }, [duration])


    useEffect(() => {
        videoRef.current.addEventListener('timeupdate', () => {
            const millisecond = videoRef.current.currentTime * 1000
            setCurrentMillisecond(millisecond)
            setDuration(videoRef.current.duration * 1000)
        })
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

    const watchPoint = useMemo(() => {
        const onePercent = duration / 100
        return currentMillisecond / onePercent
    }, [duration, currentMillisecond])

    const handleTogglePlay = useCallback(() => {
        onTogglePlay()
    }, [])

    return (
        <div ref={videoContainerRef} className='video-container'>
            <SubtitleContainer />
            <Settings />
            <div className='video-controls'>
                <ProgressBar
                    onClick={handleClickProgressBar}
                    style={{ gridArea: 'progress-bar', cursor: 'pointer' }}
                    now={watchPoint}
                />
                <Button size='sm' variant='outline-dark' onClick={handleTogglePlay}>
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
            <video onClick={handleTogglePlay} ref={videoRef} className='video' controls={false}>
                <source src={videoSrc} />
            </video>
        </div>
    )
}

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import video from '../sorce/Friendss05e09.mkv'
import subtitleEn from '../sorce/Friends5x09-en.vtt'
import subtitleRu from '../sorce/Friends5x09-ru.srt'
import { toggleFullScreenForElement } from '../utils'
import translate from 'translate'
import { Subtitle } from './Subtitle'
import { Settings } from './Settings'
import * as Icon from 'react-bootstrap-icons'
import { Button, ProgressBar } from 'react-bootstrap'
import { $settings } from '../store/settrings'

export const Application = () => {
    const [isPlay, setIsPlay] = useState(false)
    const [duration, setDuration] = useState<number>(0)
    const [textForTranslate, setTextForTranslate] = useState<string | null>(null)
    const [translateResult, setTranslateResult] = useState<string | null>(null)
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
            setTranslateResult(null)
        }
    }, [isPlay])

    const toggleFullScreen = useCallback(() => {
        const videoContainer = videoContainerRef.current
        toggleFullScreenForElement(videoContainer)
    }, [togglePlay])

    const moveVideoTo = useCallback((time: number) => {
        console.log('moveVideoTo: ', time)
        videoRef.current.currentTime = time / 1000
    }, [])

    const handleClickProgressBar = useCallback((event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        /* if (x < 0) {
                moveVideoTo(0)
                return
            } */
        const percent = x / (event.currentTarget.clientWidth / 100)
        console.log('percent: ', percent)
        moveVideoTo((duration / 100) * percent)
    }, [duration])

    const onPause = useCallback(() => {
        const video = videoRef.current
        video.pause()
        setIsPlay(false)
    }, [])

    const handleTranslate = useCallback((word: string) => {
        onPause()
        setTextForTranslate(word)
        translate(word, 'ru').then(setTranslateResult)
    }, [onPause])

    useEffect(() => {
        videoRef.current.addEventListener('timeupdate', () => {
            const millisecond = videoRef.current.currentTime * 1000
            setCurrentMillisecond(millisecond)
            setDuration(videoRef.current.duration * 1000)
        })
    }, [])

    useEffect(() => {
        const onKeydown = (event) => {
            console.log(event)
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
            <div className='subtitle-container'>
                {translateResult && <div className='translate'>
                    {translateResult}
                    <div>
                        <a
                            target='_blank'
                            href={'https://context.reverso.net/translation/english-russian/' + textForTranslate}
                            rel='noreferrer'>
                            Подробнее
                        </a>
                    </div>
                </div>}
                <Subtitle
                    onTranslate={null}
                    currentMillisecond={currentMillisecond}
                    subtitleUrl={subtitleRu}
                />
                <Subtitle
                    onTranslate={handleTranslate}
                    currentMillisecond={currentMillisecond}
                    subtitleUrl={subtitleEn}
                />
            </div>
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
                <source src={video} />
            </video>
        </div>
    )
}

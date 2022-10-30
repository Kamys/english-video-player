import React, {useCallback, useEffect, useRef, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import video from '../sorce/Friendss05e09.mkv'
import subtitleEn from '../sorce/Friends5x09-en.vtt'
import subtitleRu from '../sorce/Friends5x09-ru.srt'
import { toggleFullScreenForElement} from "../utils";
import translate from "translate";
import {Subtitle} from "./Subtitle";
import {Settings} from "./Settings";
import * as Icon from 'react-bootstrap-icons';
import {Button} from "react-bootstrap";
import {$settings} from "../store/settrings";

export const Application = () => {
    const [isPlay, setIsPlay] = useState(false)
    const [textForTranslate, setTextForTranslate] = useState<string | null>(null)
    const [translateResult, setTranslateResult] = useState<string | null>(null)
    const [currentMillisecond, setCurrentMillisecond] = useState(0)
    const videoContainerRef = useRef<HTMLDivElement>()
    const videoRef = useRef<HTMLVideoElement>()

    const toggleFullScreen = useCallback(() => {
        const videoContainer = videoContainerRef.current
        toggleFullScreenForElement(videoContainer)
    }, [])

    const onPause = useCallback(() => {
        let video = videoRef.current;
        video.pause()
        setIsPlay(false)
    }, [])

    const togglePlay = useCallback(() => {
        let video = videoRef.current;
        if (isPlay) {
            onPause()
        } else {
            video.play()
            setIsPlay(true)
            setTranslateResult(null)
        }
    }, [isPlay])

    useEffect(() => {
        videoRef.current.addEventListener('timeupdate', () => {
            let millisecond = videoRef.current.currentTime * 1000
            setCurrentMillisecond(millisecond)
        });
    }, [])

    useEffect(() => {
        const onKeydown = (event) => {
            if (event.code == 'Space') {
                togglePlay()
                event.preventDefault()
                event.stopPropagation()
            }
        }
        window.addEventListener("keydown", onKeydown)

        return () => window.removeEventListener("keydown", onKeydown)
    }, [togglePlay])

    const handleTranslate = useCallback((word: string) => {
        onPause()
        setTextForTranslate(word)
        translate(word, "ru").then(setTranslateResult)
    }, [onPause])

    return (
        <div ref={videoContainerRef} className="video-container">
            <div className="subtitle-container">
                {translateResult && <div className="translate">
                    {translateResult}
                    <div>
                        <a
                            target="_blank"
                            href={"https://context.reverso.net/translation/english-russian/" + textForTranslate}>
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
            <div className="video-controls">
                <Button size="sm" variant="outline-dark" onClick={togglePlay}>
                    {isPlay ? <Icon.Stop color="white" /> : <Icon.Play color="white" />}
                </Button>
                <div></div>
                <Button size="sm" variant="outline-dark" onClick={() => $settings.action.onToggleShow()}>
                    <Icon.Gear color="white" />
                </Button>
                <Button className="pl-1" size="sm" variant="outline-dark" onClick={toggleFullScreen}>
                    <Icon.ArrowsFullscreen color="white" />
                </Button>
            </div>
            <video onClick={togglePlay} ref={videoRef} className="video" controls={false}>
                <source src={video}/>
            </video>
        </div>
    )
}
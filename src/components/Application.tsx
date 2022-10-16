import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as video from '../sorce/Friendss05e09.mkv'
import * as subtitleEn from '../sorce/Friends5x09.vtt'
import {parseVtt, toggleFullScreenForElement} from "../utils";
import axios from "axios";
import translate from "translate";
import {Subtitle} from "./Subtitle";

export const Application = () => {
    const [isPlay, setIsPlay] = useState(false)
    const [translateResult, setTranslateResult] = useState<string | null>(null)
    const [currentMillisecond, setCurrentMillisecond] = useState(0)
    const [subtitles, setSubtitles] = useState([])
    const videoContainerRef = useRef<HTMLDivElement>()
    const videoRef = useRef<HTMLVideoElement>()

    const toggleFullScreen = useCallback(() => {
        const videoContainer = videoContainerRef.current
        toggleFullScreenForElement(videoContainer)
    }, [])

    const togglePlay = useCallback(() => {
        let video = videoRef.current;
        if (isPlay) {
            video.pause()
        } else {
            video.play()
        }
        setIsPlay(!isPlay)
    }, [isPlay])

    useEffect(() => {
        axios.get(subtitleEn).then(response => {
            const result = parseVtt(response.data)
            setSubtitles(result)
            console.log(result)
        })

        videoRef.current.addEventListener('timeupdate', (event) => {
            let millisecond = videoRef.current.currentTime * 1000
            console.log("setCurrentMillisecond: ", millisecond)
            setCurrentMillisecond(millisecond)
        });
    }, [])

    const currentSubTitle = useMemo(() => {
        const findSubtitle = subtitles.find(subtitle => {
            if (!subtitle) {
                return false
            }
            return subtitle.period.start <= currentMillisecond + 150 && subtitle.period.end >= currentMillisecond
        });
        console.log("findSubtitle: ", findSubtitle)
        return findSubtitle?.text || ""
    }, [currentMillisecond])

    const handleTranslate = useCallback((word: string) => {
        console.log("Start translate: " + word)
        setTranslateResult("Translate: " + word + ". Loading...")
        translate(word, "ru").then(setTranslateResult)
    }, [])

    return (
        <div ref={videoContainerRef} className="video-container">
            {translateResult && <div className="translate">{translateResult}</div>}
            <Subtitle text={currentSubTitle} onTranslate={handleTranslate}/>
            <div className="video-controls">
                <button type="button" onClick={togglePlay}>
                    {isPlay ? "Stop" : "Play"}
                </button>
                <button type="button" onClick={toggleFullScreen}>
                    Full screen
                </button>
            </div>
            <video ref={videoRef} className="video" controls={false}>
                <source src={video}/>

            </video>
        </div>
    )
}
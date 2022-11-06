import { SelectFile } from '../components/SelectFile'
import { Button, Col, Row } from 'react-bootstrap'
import React, { useCallback } from 'react'
import { $sources, SubtitleStore } from '../store/sources'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'effector-react'
import { ROUTS } from '../utils'

export const PageSelectVideo = () => {
    const navigate = useNavigate();
    const { videoSrc } = useStore($sources.store)

    const handleSelectSubtitle = useCallback((langKey: keyof SubtitleStore) => (link: string) => {
        $sources.action.onLoadSubtitle({ langKey, link })
    }, [])

    const handleSelectVideo = useCallback((link: string) => {
        $sources.action.onSetVideoSrc(link)
    }, [])

    const handleNext = useCallback(() => {
        navigate(ROUTS.VIDEO)
    }, [])

    return (
       <>
           <Row>
                <Col>
                    <h3>Выбирете видео файл и субтитры</h3>
                </Col>
           </Row>
           <Row className="pt-2">
               <Col md="6">
                   <SelectFile label='Выбирите видео' accept="video/mp4,video/x-m4v,video/*,.mkv" onSelect={handleSelectVideo} />
                   <SelectFile label='Выберите субтитры для иностранного языка' accept=".vtt,.srt" onSelect={handleSelectSubtitle('en')} />
                   <SelectFile label='Выберите субтитры родного языка' accept=".vtt,.srt" onSelect={handleSelectSubtitle('ru')} />
               </Col>
           </Row>
           <Row>
               <p>
                   Субтитры можно найти на сайте{" "}
                   <a target="_blank" href='https://www.opensubtitles.org/ru/search/sublanguageid-rus,eng'>
                       Open Subtitles
                   </a>
               </p>
           </Row>
           <Row>
               <Button onClick={handleNext} disabled={!videoSrc}>Продолжить</Button>
           </Row>
       </>
    )
}
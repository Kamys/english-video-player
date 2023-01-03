import { SelectFile } from '../components/SelectFile'
import { Button, Col, Row } from 'react-bootstrap'
import React, { useCallback, useState } from 'react'
import { $sources, SubtitleStore } from '../store/sources'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'effector-react'
import { ROUTS } from '../utils'

export const PageSelectVideo = () => {
    const navigate = useNavigate()
    const { videoSrc } = useStore($sources.store)
    const [fileName, setFileName] = useState('')

    const handleSelectSubtitle = useCallback((langKey: keyof SubtitleStore) => (file: File) => {
        const link = URL.createObjectURL(file)
        $sources.action.onLoadSubtitle({ langKey, link })
    }, [])

    const handleSelectVideo = useCallback((file: File) => {
        const objectURL = URL.createObjectURL(file)
        setFileName(file.name)
        $sources.action.onSetVideoSrc(objectURL)
    }, [])

    const handleNext = useCallback(() => {
        navigate(ROUTS.VIDEO)
    }, [])

    const podnapisiURL = fileName ? 'https://www.podnapisi.net/ru/subtitles/search/?keywords=' + fileName + "&movie_type=&seasons=&episodes=&year="
                                  : 'https://www.podnapisi.net'

    return (
        <>
            <Row>
                <Col>
                    <h3>Выберете видео файл и субтитры</h3>
                </Col>
            </Row>
            <Row className='pt-2'>
                <Col md='6'>
                    <SelectFile label='Выберете видео' accept='video/mp4,video/x-m4v,video/*,.mkv'
                                onSelect={handleSelectVideo} />
                    <SelectFile label='Выберите субтитры для иностранного языка' accept='.vtt,.srt'
                                onSelect={handleSelectSubtitle('en')} />
                    <SelectFile label='Выберите субтитры родного языка' accept='.vtt,.srt'
                                onSelect={handleSelectSubtitle('ru')} />
                </Col>
            </Row>
            <Row>
                <p>
                    Субтитры можно найти на сайтах:
                </p>
                <ul>
                    <li>
                        <a target='_blank' href='https://www.opensubtitles.org/ru/search/sublanguageid-rus,eng'>
                            Open Subtitles
                        </a>
                    </li>
                    <li>
                        <a target='_blank' href='https://subask.com'>
                            Subask.com
                        </a>
                    </li>
                    <li>
                        <a target='_blank' href={podnapisiURL}>
                            {podnapisiURL}
                        </a>
                    </li>
                </ul>
            </Row>
            <Row>
                <Button onClick={handleNext} disabled={!videoSrc}>Продолжить</Button>
            </Row>
        </>
    )
}
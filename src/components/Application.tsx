import React, { useCallback, useState } from 'react'
import { VideoContainer } from './VideoContainer'
import { SelectFile } from './SelectFile'
import { $subtitle, SubtitleStore } from '../store/subtitle'
import { SubtitleControl } from './SubtitleControl'
import { Col, Container, Row } from 'react-bootstrap'

export const Application = () => {
    const [videoSrc, setVideoSrc] = useState(null)

    const handleSelectSubtitle = useCallback((langKey: keyof SubtitleStore) => (link) => {
        $subtitle.action.loadSubtitle({ langKey, link })
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <SelectFile label='Выбирите видео' onSelect={setVideoSrc} />
                    <SelectFile label='Выберите субтитры en' onSelect={handleSelectSubtitle('en')} />
                    <SelectFile label='Выберите субтитры ru' onSelect={handleSelectSubtitle('ru')} />
                </Col>
                <Col>
                    {videoSrc &&
                        <VideoContainer
                            videoSrc={videoSrc}
                        />
                    }
                </Col>
            </Row>
            <Row>
                <Col md='6'>
                    <SubtitleControl langKey='en' />
                </Col>
                <Col md='6'>
                    <SubtitleControl langKey='ru' />
                </Col>
            </Row>
        </Container>
    )
}
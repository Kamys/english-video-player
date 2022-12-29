import React, { useCallback, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import { Navigate } from 'react-router-dom'
import { $sources } from '../store/sources'
import { SubtitlesContainer } from '../components/subtitle/SubtitlesContainer'
import { Settings } from '../components/Settings'
import { Video } from '../components/Video'
import { VideoControls } from '../components/VideoControls'
import { ROUTS, toggleFullScreenForElement, useActivity } from '../utils'
import { Button, Col, Row } from 'react-bootstrap'
import * as Icons from 'react-bootstrap-icons'
import { SubtitleAdjustment } from '../components/subtitle/SubtitleAdjustment'

export const PageVideo = () => {
    const { videoSrc } = useStore($sources.store)
    const videoContainerRef = useRef<HTMLDivElement>()
    const [goToTime, setGoToTime] = useState(0)

    const handleToggleFullScreen = useCallback(() => {
        const videoContainer = videoContainerRef.current
        toggleFullScreenForElement(videoContainer)
    }, [])

    const handleBack = useCallback(() => {
        $sources.action.onSetVideoSrc(null)
    }, [])

    useActivity()

    if (!videoSrc) {
        return <Navigate replace to={ROUTS.SELECT_VIDEO} />
    }

    return (
        <>
            <Row>
                <Col md="1">
                    <Button onClick={handleBack} style={{ display: 'flex' }}><Icons.ArrowLeft/></Button>
                </Col>
                <Col>
                    <div ref={videoContainerRef} className='video-container'>
                        <SubtitlesContainer />
                        <Settings />
                        <VideoControls
                            onToggleFullScreen={handleToggleFullScreen}
                            onMoveVideoTo={setGoToTime}
                        />
                        <Video goToTime={goToTime} />
                    </div>
                </Col>
                <Col>
                    <SubtitleAdjustment />
                </Col>
            </Row>
            <Row>
                <Col md={{ offset: 3 }}>
                    You can press <b>K</b> for show Foreign subtitle
                    <br/>
                    You can press <b>L</b> for show Native subtitle
                </Col>
            </Row>
        </>
    )
}
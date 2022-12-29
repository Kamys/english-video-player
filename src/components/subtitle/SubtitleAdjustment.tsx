import React, { useCallback, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { SubtitleControl } from './SubtitleControl'
import { SubtitleStore } from '../../store/sources'

export const SubtitleAdjustment = () => {
    const [isShow, setIsShow]  = useState(false)
    const [langKey, setLangKey]  = useState<keyof SubtitleStore>("en")

    const handleClose = useCallback(() => {
        setIsShow(false)
        setLangKey("en")
    }, [])

    if (!isShow) {
        return (
            <Button
                size='sm'
                onClick={() => setIsShow(true)}
            >
                Отстают субтитры
            </Button>
        )
    }

    if (langKey === 'ru') {
        return (
            <>
                <Row>
                    <Col>
                        <h4>Выберете какая дорожка должна сейчас отображаться на родном языке</h4>
                        <SubtitleControl langKey={"ru"} />
                    </Col>
                </Row>
                <Row>
                    <Button onClick={handleClose} className="mt-1">Продолжить</Button>
                </Row>
            </>
        )
    }

    return (
        <>
            <Row>
                <Col>
                    <h4>Выберете какая дорожка должна сейчас отображаться на иностранном языке</h4>
                    <SubtitleControl langKey={"en"} />
                </Col>
            </Row>
            <Row>
                <Button onClick={() => setLangKey('ru')} className="mt-1">Продолжить</Button>
            </Row>
        </>
    )
}
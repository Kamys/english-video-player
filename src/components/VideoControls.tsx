import React, { useCallback, useMemo } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { $settings } from '../store/settrings'
import { useStore } from 'effector-react'
import { $video } from '../store/video'

const { onTogglePlay } = $video.action

interface Props {
    onToggleFullScreen: () => void
    onMoveVideoTo: (time: number) => void
}

export const VideoControls: React.FC<Props> = ({ onMoveVideoTo, onToggleFullScreen }) => {
    const { isPlay, currentMillisecond, duration } = useStore($video.store)

    const handleClickProgressBar = useCallback((event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percent = x / (event.currentTarget.clientWidth / 100)
        onMoveVideoTo((duration / 100) * percent)
    }, [duration])

    const watchPoint = useMemo(() => {
        const onePercent = duration / 100
        return currentMillisecond / onePercent
    }, [duration, currentMillisecond])

    const handleTogglePlay = useCallback(() => {
        onTogglePlay()
    }, [])

    return (
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
            <Button className='pl-1' size='sm' variant='outline-dark' onClick={onToggleFullScreen}>
                <Icon.ArrowsFullscreen color='white' />
            </Button>
        </div>
    )
}
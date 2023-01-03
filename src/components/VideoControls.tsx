import React, { useCallback, useMemo } from 'react'
import { Button, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { $settings } from '../store/settrings'
import { useStore } from 'effector-react'
import { $video } from '../store/video'
import { $interfaceActivity } from '../store/interfaceActivity'
import { toTime } from '../utils'


interface Props {
    onToggleFullScreen: () => void
    onMoveVideoTo: (time: number) => void
}

const { onTogglePlay, setVolume } = $video.action
const { onToggleSubtitleState } = $settings.action

const zeroOrMore = (number: number) => {
    return number < 0 ? 0 : number
}

export const VideoControls: React.FC<Props> = ({ onMoveVideoTo, onToggleFullScreen }) => {
    const { isPlay, currentMillisecond, duration, volume } = useStore($video.store)
    const isInterfaceActivity = useStore($interfaceActivity.store)
    const { foreign, native } = useStore($settings.store.settings)

    const handleClickProgressBar = useCallback((event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percent = x / (event.currentTarget.clientWidth / 100)
        onMoveVideoTo((duration / 100) * percent)
    }, [duration])

    const handleClickVolumeBar = useCallback((event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percent = x / (event.currentTarget.clientWidth / 100)
        const newVolume = zeroOrMore(percent / 100)
        setVolume(newVolume)
    }, [])

    const watchPoint = useMemo(() => {
        const onePercent = duration / 100
        return currentMillisecond / onePercent
    }, [duration, currentMillisecond])

    const handleTogglePlay = useCallback(() => {
        onTogglePlay()
    }, [])

    const handleToggleVolume = useCallback(() => {
        if (volume === 0) {
            setVolume(0.5)
        } else {
            setVolume(0)
        }
    }, [volume])

    if (!isInterfaceActivity) {
        return <div></div>
    }

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
            <Button size='sm' variant='outline-dark' onClick={handleToggleVolume}>
                {volume === 0 ? <Icon.VolumeMute color='white' /> : <Icon.VolumeDown color='white' />}
            </Button>
            <ProgressBar
                onClick={handleClickVolumeBar}
                style={{ cursor: 'pointer' }}
                now={volume * 100}
            />
            <div className="video-time">{toTime(currentMillisecond)}</div>
            <div></div>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button size='sm' variant='outline-dark' onClick={() => onToggleSubtitleState('foreign')}>
                    Foreign: {foreign}
                </Button>
                <Button size='sm' variant='outline-dark' onClick={() => onToggleSubtitleState('native')}>
                    Native: {native}
                </Button>
                <Button className='pl-1' size='sm' variant='outline-dark' onClick={onToggleFullScreen}>
                    <Icon.ArrowsFullscreen color='white' />
                </Button>
            </div>
        </div>
    )
}
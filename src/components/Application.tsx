import React, { useCallback, useState } from 'react'
import { VideoContainer } from './VideoContainer'
import { SelectFile } from './SelectFile'
import { $subtitle, SubtitleStore } from '../store/subtitle'

export const Application = () => {
    const [videoSrc, setVideoSrc] = useState(null)

    const handleSelectSubtitle = useCallback((langKey: keyof SubtitleStore) => (link) => {
        $subtitle.action.loadSubtitle({ langKey, link })
    }, [])

    return (
        <div style={{ padding: 10, width: 500 }}>
            <SelectFile label='Выбирите видео' onSelect={setVideoSrc} />
            <SelectFile label='Выберите субтитры en' onSelect={handleSelectSubtitle('en')} />
            <SelectFile label='Выберите субтитры ru' onSelect={handleSelectSubtitle('ru')} />
            {videoSrc &&
                <VideoContainer
                    videoSrc={videoSrc}
                />}
        </div>
    )
}
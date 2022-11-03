import React, { useState } from 'react'
import { VideoContainer } from './VideoContainer'
import { SelectFile } from './SelectFile'

export const Application = () => {
    const [videoSrc, setVideoSrc] = useState(null)
    const [subtitleOneSrc, setSubtitleOneSrc] = useState(null)
    const [subtitleTwoSrc, setSubtitleTwoSrc] = useState(null)

    return (
        <div style={{ padding: 10, width: 500 }}>
            <SelectFile label='Выбирите видео' onSelect={setVideoSrc} />
            <SelectFile label='Выберите субтитры en' onSelect={setSubtitleOneSrc} />
            <SelectFile label='Выберите субтитры ru' onSelect={setSubtitleTwoSrc} />
            {videoSrc &&
                <VideoContainer
                    videoSrc={videoSrc}
                    subtitleOneSrc={subtitleOneSrc}
                    subtitleTwoSrc={subtitleTwoSrc}
                />}
        </div>
    )
}
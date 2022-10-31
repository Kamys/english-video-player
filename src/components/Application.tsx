import React, { useState } from 'react'
import { VideoContainer } from './VideoContainer'
import { SelectFile } from './SelectFile'

export const Application = () => {
    const [videoSrc, setVideoSrc] = useState(null)
    const [subtitleOneSrc, setSubtitleOneSrc] = useState(null)
    const [subtitleTwoSrc, setSubtitleTwoSrc] = useState(null)

    return (
        <div style={{ padding: 10 }}>
            <SelectFile label='Select video' onSelect={setVideoSrc} />
            <SelectFile label='Select subtitle en' onSelect={setSubtitleOneSrc} />
            <SelectFile label='Select subtitle ru' onSelect={setSubtitleTwoSrc} />
            {videoSrc &&
                <VideoContainer
                    videoSrc={videoSrc}
                    subtitleOneSrc={subtitleOneSrc}
                    subtitleTwoSrc={subtitleTwoSrc}
                />}
        </div>
    )
}
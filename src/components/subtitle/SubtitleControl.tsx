import React, { useCallback, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $video } from '../../store/video'
import { $sources, SubtitleStore } from '../../store/sources'
import { toTime, useCurrentSubtitle } from '../../utils'
import { ListGroup } from 'react-bootstrap'
import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import { $subtitle } from '../../store/subtitle'

interface Props {
    langKey: keyof SubtitleStore
}

export const SubtitleControl: React.FC<Props> = ({ langKey }) => {
    const subtitles = useStore($sources.store).subtitle[langKey]
    const ref = useRef<HTMLDivElement>()

    const currentEntry = useCurrentSubtitle(langKey)
    useEffect(() => {
        const index = subtitles.findIndex(s => s.id === currentEntry?.id)
        ref.current.children[index]?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
    }, [subtitles, currentEntry])

    return (
        <ListGroup className='subtitle-control' ref={ref} style={{ maxHeight: 370 }}>
            {subtitles.map((sources) => (
                <SubtitleItem
                    key={sources.id}
                    langKey={langKey}
                    sources={sources}
                    isActive={sources.id === currentEntry?.id}
                />
            ))}
        </ListGroup>
    )
}

interface SubtitleItemProps {
    sources: Entry
    isActive: boolean
    langKey: keyof SubtitleStore
}

const SubtitleItem: React.FC<SubtitleItemProps> = ({ sources, isActive, langKey }) => {
    const ref = useRef<HTMLAnchorElement>()
    const { currentMillisecond } = useStore($video.store)
    const currentSubtitleEn = useCurrentSubtitle('en')

    const handleSecondSubtitleId = useCallback(() => {
        const diffId = parseInt(sources.id) - parseInt(currentSubtitleEn?.id)
        $subtitle.action.setSubtitleIdDiff(diffId)
    }, [currentSubtitleEn, sources])

    const handleClick = useCallback(() => {
        handleSecondSubtitleId()
        if (langKey === 'ru') {
            return
        }
        const diff = sources.from - currentMillisecond
        $subtitle.action.setSubtitleDiff(diff)
    }, [currentMillisecond, langKey])

    return (
        <ListGroup.Item
            className="subtitle-item"
            ref={ref}
            active={isActive}
            onClick={handleClick}
        >
            {sources.id}. {toTime(sources.from)} - {toTime(sources.to)} <br /> {sources.text}
        </ListGroup.Item>
    )
}
import React, { useCallback, useRef } from 'react'
import { useStore } from 'effector-react'
import { $video } from '../store/video'
import { $sources, SubtitleStore } from '../store/sources'
import { toTime, useCurrentSubtitle } from '../utils'
import { Button, ListGroup } from 'react-bootstrap'
import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import { $subtitleDiff } from '../store/subtitleDiff'

interface Props {
    langKey: keyof SubtitleStore
}

export const SubtitleControl: React.FC<Props> = ({ langKey }) => {
    const { currentMillisecond } = useStore($video.store)
    const diff = useStore($subtitleDiff.store)[langKey]
    const subtitles = useStore($sources.store).sources[langKey]
    const ref = useRef<HTMLDivElement>()

    const currentEntry = useCurrentSubtitle(langKey)
    const handleScroll = useCallback(() => {
        const index = subtitles.findIndex(s => s.id === currentEntry?.id)
        ref.current.children[index]?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
    }, [subtitles, currentEntry])

    return (
        <div>
            <Button onClick={handleScroll}>Scroll to current</Button>
            <div>currentMillisecond: {toTime(currentMillisecond)} {toTime(currentMillisecond+diff)}</div>
            <ListGroup className='sources-control' ref={ref} style={{ maxHeight: 300 }}>
                {subtitles.map((sources) => (
                    <SubtitleItem
                        key={sources.id}
                        langKey={langKey}
                        sources={sources}
                        isActive={sources.id === currentEntry?.id}
                    />
                ))}
            </ListGroup>
        </div>
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
        console.log(diffId)
        $subtitleDiff.action.setSubtitleIdDiff(diffId)
    }, [currentSubtitleEn])

    const handleClick = useCallback(() => {
        handleSecondSubtitleId()
        if (langKey === 'ru') {
            return
        }
        const diff = sources.from - currentMillisecond
        $subtitleDiff.action.setSubtitleDiff(diff)
    }, [currentMillisecond, langKey])

    return (
        <ListGroup.Item
            ref={ref}
            active={isActive}
            onClick={handleClick}
        >
            {sources.id}. {toTime(sources.from)} - {toTime(sources.to)} <br/> {sources.text}
        </ListGroup.Item>
    )
}
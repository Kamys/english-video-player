import React, { useCallback, useMemo, useRef } from 'react'
import { useStore } from 'effector-react'
import { $video } from '../store/video'
import { $subtitle, SubtitleStore } from '../store/subtitle'
import { getSubtitle } from '../utils'
import { Button, ListGroup } from 'react-bootstrap'
import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import { $subtitleDiff } from '../store/subtitleDiff'

interface Props {
    langKey: keyof SubtitleStore
}

export const SubtitleControl: React.FC<Props> = ({ langKey }) => {
    const { currentMillisecond } = useStore($video.store)
    const diff = useStore($subtitleDiff.store)[langKey]
    const subtitles = useStore($subtitle.store)[langKey]
    const ref = useRef<HTMLDivElement>()

    const currentEntry = useMemo(() => getSubtitle(subtitles, currentMillisecond, diff),
        [currentMillisecond, subtitles, diff])
    const handleScroll = useCallback(() => {
        const index = subtitles.findIndex(s => s.id === currentEntry?.id)
        ref.current.children[index]?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
    }, [subtitles, currentEntry])

    return (
        <div>
            <Button onClick={handleScroll}>Scroll to current</Button>
            <ListGroup className='subtitle-control' ref={ref} style={{ maxHeight: 300 }}>
                {subtitles.map((subtitle) => (
                    <SubtitleItem
                        key={subtitle.id}
                        langKey={langKey}
                        subtitle={subtitle}
                        isActive={subtitle.id === currentEntry?.id}
                    />
                ))}
            </ListGroup>
        </div>
    )
}

interface SubtitleItemProps {
    subtitle: Entry
    isActive: boolean
    langKey: keyof SubtitleStore
}

const SubtitleItem: React.FC<SubtitleItemProps> = ({ subtitle, isActive, langKey }) => {
    const ref = useRef<HTMLAnchorElement>()
    const { currentMillisecond } = useStore($video.store)

    const handleClick = useCallback(() => {
        const diff = currentMillisecond - subtitle.from
        console.log('diff: ', diff)
        $subtitleDiff.action.setSubtitleDiff({ langKey, diff: diff })
    }, [])

    return (
        <ListGroup.Item
            ref={ref}
            active={isActive}
            onClick={handleClick}
        >
            {subtitle.id}. {subtitle.text}
        </ListGroup.Item>
    )
}
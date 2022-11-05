import React, { FC, useCallback, useMemo } from 'react'
import { Word } from './Word'
import { getSubtitle, useCurrentSubtitle } from '../utils'
import { useStore } from 'effector-react'
import { $subtitle, SubtitleStore } from '../store/subtitle'
import { $subtitleDiff } from '../store/subtitleDiff'
import { $video } from '../store/video'

interface Props {
    currentMillisecond: number
    isDisplay: boolean

    onTranslate(word: string)

    langKey: keyof SubtitleStore
    second?: boolean
}

export const Subtitle: FC<Props> = ({ onTranslate, isDisplay, langKey }) => {
    const currentText = useCurrentSubtitle(langKey)?.text

    const handleClick = useCallback((data) => (e) => {
        e.stopPropagation()
        e.preventDefault()
        onTranslate(data
            .replaceAll('.', '')
            .replaceAll('?', '')
            .replaceAll('!', '')
            .replaceAll(',', ''),
        )
    }, [])

    const handleTranslateAll = useCallback(() => {
        if (onTranslate) {
            onTranslate(currentText)
        }
    }, [currentText])

    const wordComponents = currentText?.split(' ').map((word, index) => {
        const key = word + index.toString()
        return (
            <Word key={key} word={word} onClick={handleClick(word)} needBacklight={!!onTranslate} />
        )
    })

    return (
        <div
            style={{ opacity: wordComponents && isDisplay ? 1 : 0 }}
            onClick={handleTranslateAll}
            className='subtitle'
            key={currentText}
        >
            {wordComponents}
        </div>
    )
}
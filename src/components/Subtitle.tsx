import React, { FC, useCallback, useMemo } from 'react'
import { Word } from './Word'
import { getSubtitle } from '../utils'
import { useStore } from 'effector-react'
import { $subtitle, SubtitleStore } from '../store/subtitle'

interface Props {
    currentMillisecond: number
    isDisplay: boolean
    onTranslate(word: string)
    langKey: keyof SubtitleStore
}

export const Subtitle: FC<Props> = ({ onTranslate, currentMillisecond, isDisplay, langKey }) => {
    const store = useStore($subtitle.store)
    const subtitles = store[langKey]

    const currentText = useMemo(() => getSubtitle(subtitles, currentMillisecond), [currentMillisecond, subtitles])

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
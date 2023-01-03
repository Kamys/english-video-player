import React, { FC, useCallback } from 'react'
import { Word } from '../Word'
import { useCurrentSubtitle } from '../../utils'
import { SubtitleStore } from '../../store/sources'

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
        onTranslate && onTranslate(data
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
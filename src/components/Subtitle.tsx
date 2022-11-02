import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import * as subtitleParser from '@plussub/srt-vtt-parser'
import { Entry } from '@plussub/srt-vtt-parser/dist/src/types'
import { Word } from './Word'

interface Props {
    subtitleUrl: string
    currentMillisecond: number
    isDisplay: boolean
    onTranslate(word: string)
}

export const Subtitle: FC<Props> = ({ onTranslate, subtitleUrl, currentMillisecond, isDisplay }) => {
    const [subtitles, setSubtitles] = useState<Entry[]>([])

    useEffect(() => {
        axios.get<string>(subtitleUrl).then(response => {
            const result = subtitleParser.parse(response.data)
            setSubtitles(result.entries)
        })
    }, [subtitleUrl])

    const currentText = useMemo(() => {
        const findSubtitle = subtitles.find(subtitle => {
            if (!subtitle) {
                return false
            }
            return subtitle.from <= currentMillisecond + 150 && subtitle.to >= currentMillisecond
        })

        return findSubtitle?.text
    }, [currentMillisecond])

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

    const words = currentText?.split(' ').map((word, index) => {
        const key = word + index.toString()
        return (
            <Word key={key} word={word} onClick={handleClick(word)} needBacklight={!!onTranslate} />
        )
    })

    console.log("Render subtitle: ", currentText, words, currentMillisecond)

    return (
        <div
            style={{ opacity: words && isDisplay ? 1 : 0 }}
            onClick={handleTranslateAll}
            className='subtitle'
            key={currentText}
        >
            {words}
        </div>
    )
}
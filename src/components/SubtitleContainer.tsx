import React, { useCallback } from 'react'
import { Subtitle } from './Subtitle'
import { $translate } from '../store/translate'
import { useStore } from 'effector-react'
import { $settings } from '../store/settrings'

interface Props {
    isPlay: boolean
    onPause: () => void
    subtitleTwoSrc: string
    subtitleOneSrc: string
    currentMillisecond: number
}

export const SubtitleContainer: React.FC<Props> = ({
                                                       onPause,
                                                       subtitleOneSrc,
                                                       subtitleTwoSrc,
                                                       currentMillisecond,
                                                       isPlay,
                                                   }) => {
    const { translateResult, textForTranslate } = useStore($translate.store)
    const {
        isDisplaySubtitles,
        isDisplayRusSubtitlesOnlyOnPause,
        isDisplayEnSubtitlesOnlyOnPause,
    } = useStore($settings.store.settings)

    const handleTranslate = useCallback((word: string) => {
        onPause()
        $translate.action.onTranslate(word)
    }, [onPause])

    if (!isDisplaySubtitles) {
        return null
    }

    return (
        <div className='subtitle-container'>
            {translateResult && <div className='translate'>
                {translateResult}
                <div>
                    <a
                        target='_blank'
                        href={'https://context.reverso.net/translation/english-russian/' + textForTranslate}
                        rel='noreferrer'>
                        Подробнее
                    </a>
                </div>
            </div>}
            {subtitleTwoSrc && <Subtitle
                isDisplay={isDisplayRusSubtitlesOnlyOnPause ? !isPlay : true}
                onTranslate={null}
                currentMillisecond={currentMillisecond}
                subtitleUrl={subtitleTwoSrc}
            />}
            {subtitleOneSrc && <Subtitle
                isDisplay={isDisplayEnSubtitlesOnlyOnPause ? !isPlay : true}
                onTranslate={handleTranslate}
                currentMillisecond={currentMillisecond}
                subtitleUrl={subtitleOneSrc}
            />}
        </div>
    )
}
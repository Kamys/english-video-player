import React, { useCallback } from 'react'
import { Subtitle } from './Subtitle'
import { $translate } from '../store/translate'
import { useStore } from 'effector-react'
import { $settings, SubtitleState } from '../store/settrings'
import { $video } from '../store/video'

interface Props {
}

const { onPause } = $video.action

export const SubtitleContainer: React.FC<Props> = () => {
    const { currentMillisecond, isPlay } = useStore($video.store)
    const { translateResult, textForTranslate } = useStore($translate.store)
    const { foreign, native } = useStore($settings.store.settings)

    const handleTranslate = useCallback((word: string) => {
        onPause()
        $translate.action.onTranslate(word)
    }, [onPause])

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
            {native != SubtitleState.Never && <Subtitle
                isDisplay={native === SubtitleState.Pause ? !isPlay : true}
                onTranslate={null}
                currentMillisecond={currentMillisecond}
                langKey='ru'
            />}
            {foreign != SubtitleState.Never && <Subtitle
                isDisplay={foreign === SubtitleState.Pause ? !isPlay : true}
                onTranslate={handleTranslate}
                currentMillisecond={currentMillisecond}
                langKey='en'
            />}
        </div>
    )
}
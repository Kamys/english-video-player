import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Subtitle } from './Subtitle'
import { $translate } from '../../store/translate'
import { useStore } from 'effector-react'
import { $settings, SettingsStore, SubtitleState } from '../../store/settrings'
import { $video } from '../../store/video'

interface Props {
}

const { onPause } = $video.action

export const isDisplaySubtitle = (subtitleMode: SubtitleState, isPlay: Boolean, isPressShowButton: Boolean) => {
    if (isPressShowButton) {
        return true
    }
    if (subtitleMode === SubtitleState.Pause) {
        return !isPlay
    }
    if (subtitleMode === SubtitleState.Never) {
        return false
    }
    return true
}

interface SubtitleContainerProps {
    lang: keyof SettingsStore
    showWhenPressKey: string

    onTranslate(word: string)
}

export const SubtitleContainer: React.FC<SubtitleContainerProps> = ({ lang, showWhenPressKey, onTranslate }) => {
    const { currentMillisecond, isPlay } = useStore($video.store)
    const subtitleMode = useStore($settings.store.settings)[lang]
    const [isKeyShowPress, setKeyShowPress] = useState(false)

    useEffect(() => {
        const onKeydown = (event) => {
            console.log(event.code)
            if (event.code === showWhenPressKey) {
                setKeyShowPress(true)
            }
        }
        window.addEventListener('keydown', onKeydown)

        return () => window.removeEventListener('keydown', onKeydown)
    }, [])

    useEffect(() => {
        const onKeydown = (event) => {
            if (event.code === showWhenPressKey) {
                setKeyShowPress(false)
            }
        }
        window.addEventListener('keyup', onKeydown)

        return () => window.removeEventListener('keyup', onKeydown)
    }, [])

    const isDisplayNativeSub = useMemo(() => {
        return isDisplaySubtitle(subtitleMode, isPlay, isKeyShowPress)
    }, [subtitleMode, isPlay, isKeyShowPress])

    console.log("isKeyShowPress", { lang, isKeyShowPress, isDisplayNativeSub })

    return (
        <Subtitle
            isDisplay={isDisplayNativeSub}
            onTranslate={onTranslate}
            currentMillisecond={currentMillisecond}
            langKey={lang === 'native' ? 'ru' : 'en'}
        />
    )
}

export const SubtitlesContainer: React.FC<Props> = () => {
    const { translateResult, textForTranslate } = useStore($translate.store)

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
            <SubtitleContainer
                lang='native'
                showWhenPressKey='KeyL'
                onTranslate={null}
            />
            <SubtitleContainer
                lang='foreign'
                showWhenPressKey='KeyK'
                onTranslate={handleTranslate}
            />
        </div>
    )
}
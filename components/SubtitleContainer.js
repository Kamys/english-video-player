import React, { useCallback } from 'react';
import { Subtitle } from './Subtitle';
import { $translate } from '../store/translate';
import { useStore } from 'effector-react';
import { $settings } from '../store/settrings';
import { $video } from '../store/video';
const { onPause } = $video.action;
export const SubtitleContainer = () => {
    const { currentMillisecond, isPlay } = useStore($video.store);
    const { translateResult, textForTranslate } = useStore($translate.store);
    const { isDisplaySubtitles, isDisplayRusSubtitlesOnlyOnPause, isDisplayEnSubtitlesOnlyOnPause, isDisplayEnSubtitles, isDisplayRusSubtitles, } = useStore($settings.store.settings);
    const handleTranslate = useCallback((word) => {
        onPause();
        $translate.action.onTranslate(word);
    }, [onPause]);
    if (!isDisplaySubtitles) {
        return null;
    }
    return (React.createElement("div", { className: 'subtitle-container' },
        translateResult && React.createElement("div", { className: 'translate' },
            translateResult,
            React.createElement("div", null,
                React.createElement("a", { target: '_blank', href: 'https://context.reverso.net/translation/english-russian/' + textForTranslate, rel: 'noreferrer' }, "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435"))),
        isDisplayRusSubtitles && React.createElement(Subtitle, { isDisplay: isDisplayRusSubtitlesOnlyOnPause ? !isPlay : true, onTranslate: null, currentMillisecond: currentMillisecond, langKey: 'ru' }),
        isDisplayEnSubtitles && React.createElement(Subtitle, { isDisplay: isDisplayEnSubtitlesOnlyOnPause ? !isPlay : true, onTranslate: handleTranslate, currentMillisecond: currentMillisecond, langKey: 'en' })));
};
//# sourceMappingURL=SubtitleContainer.js.map
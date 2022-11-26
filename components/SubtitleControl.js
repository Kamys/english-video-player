import React, { useCallback, useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { $video } from '../store/video';
import { $sources } from '../store/sources';
import { toTime, useCurrentSubtitle } from '../utils';
import { ListGroup } from 'react-bootstrap';
import { $subtitle } from '../store/subtitle';
export const SubtitleControl = ({ langKey }) => {
    const subtitles = useStore($sources.store).subtitle[langKey];
    const ref = useRef();
    const currentEntry = useCurrentSubtitle(langKey);
    useEffect(() => {
        const index = subtitles.findIndex(s => s.id === currentEntry?.id);
        ref.current.children[index]?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    }, [subtitles, currentEntry]);
    return (React.createElement(ListGroup, { className: 'subtitle-control', ref: ref, style: { maxHeight: 370 } }, subtitles.map((sources) => (React.createElement(SubtitleItem, { key: sources.id, langKey: langKey, sources: sources, isActive: sources.id === currentEntry?.id })))));
};
const SubtitleItem = ({ sources, isActive, langKey }) => {
    const ref = useRef();
    const { currentMillisecond } = useStore($video.store);
    const currentSubtitleEn = useCurrentSubtitle('en');
    const handleSecondSubtitleId = useCallback(() => {
        const diffId = parseInt(sources.id) - parseInt(currentSubtitleEn?.id);
        console.log(diffId);
        $subtitle.action.setSubtitleIdDiff(diffId);
    }, [currentSubtitleEn, sources]);
    const handleClick = useCallback(() => {
        handleSecondSubtitleId();
        if (langKey === 'ru') {
            return;
        }
        const diff = sources.from - currentMillisecond;
        $subtitle.action.setSubtitleDiff(diff);
    }, [currentMillisecond, langKey]);
    return (React.createElement(ListGroup.Item, { className: "subtitle-item", ref: ref, active: isActive, onClick: handleClick },
        sources.id,
        ". ",
        toTime(sources.from),
        " - ",
        toTime(sources.to),
        " ",
        React.createElement("br", null),
        " ",
        sources.text));
};
//# sourceMappingURL=SubtitleControl.js.map
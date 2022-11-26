import React, { useCallback, useMemo } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { $settings } from '../store/settrings';
import { useStore } from 'effector-react';
import { $video } from '../store/video';
const { onTogglePlay } = $video.action;
const { onToggleShow, onToggleSubtitleState } = $settings.action;
export const VideoControls = ({ onMoveVideoTo, onToggleFullScreen }) => {
    const { isPlay, currentMillisecond, duration } = useStore($video.store);
    const { foreign, native } = useStore($settings.store.settings);
    const handleClickProgressBar = useCallback((event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percent = x / (event.currentTarget.clientWidth / 100);
        onMoveVideoTo((duration / 100) * percent);
    }, [duration]);
    const watchPoint = useMemo(() => {
        const onePercent = duration / 100;
        return currentMillisecond / onePercent;
    }, [duration, currentMillisecond]);
    const handleTogglePlay = useCallback(() => {
        onTogglePlay();
    }, []);
    return (React.createElement("div", { className: 'video-controls' },
        React.createElement(ProgressBar, { onClick: handleClickProgressBar, style: { gridArea: 'progress-bar', cursor: 'pointer' }, now: watchPoint }),
        React.createElement(Button, { size: 'sm', variant: 'outline-dark', onClick: handleTogglePlay }, isPlay ? React.createElement(Icon.Stop, { color: 'white' }) : React.createElement(Icon.Play, { color: 'white' })),
        React.createElement("div", null),
        React.createElement("div", { style: { display: "flex", justifyContent: 'right' } },
            React.createElement(Button, { size: 'sm', variant: 'outline-dark', onClick: () => onToggleSubtitleState("foreign") },
                "Foreign: ",
                foreign),
            React.createElement(Button, { size: 'sm', variant: 'outline-dark', onClick: () => onToggleSubtitleState("native") },
                "Native: ",
                native),
            React.createElement(Button, { size: 'sm', variant: 'outline-dark', onClick: () => onToggleShow() },
                React.createElement(Icon.Gear, { color: 'white' })),
            React.createElement(Button, { className: 'pl-1', size: 'sm', variant: 'outline-dark', onClick: onToggleFullScreen },
                React.createElement(Icon.ArrowsFullscreen, { color: 'white' })))));
};
//# sourceMappingURL=VideoControls.js.map
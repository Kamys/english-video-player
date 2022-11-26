import React, { useCallback, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { $sources } from '../store/sources';
import { SubtitleContainer } from '../components/SubtitleContainer';
import { Settings } from '../components/Settings';
import { Video } from '../components/Video';
import { VideoControls } from '../components/VideoControls';
import { ROUTS, toggleFullScreenForElement } from '../utils';
import { Button, Col, Row } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { SubtitleSetting } from '../components/SubtitleSetting';
export const PageVideo = () => {
    const { videoSrc } = useStore($sources.store);
    const videoContainerRef = useRef();
    const [goToTime, setGoToTime] = useState(0);
    const handleToggleFullScreen = useCallback(() => {
        const videoContainer = videoContainerRef.current;
        toggleFullScreenForElement(videoContainer);
    }, []);
    const handleBack = useCallback(() => {
        $sources.action.onSetVideoSrc(null);
    }, []);
    if (!videoSrc) {
        return React.createElement(Navigate, { replace: true, to: ROUTS.SELECT_VIDEO });
    }
    return (React.createElement(Row, null,
        React.createElement(Col, { md: "1" },
            React.createElement(Button, { onClick: handleBack, style: { display: 'flex' } },
                React.createElement(Icons.ArrowLeft, null))),
        React.createElement(Col, null,
            React.createElement("div", { ref: videoContainerRef, className: 'video-container' },
                React.createElement(SubtitleContainer, null),
                React.createElement(Settings, null),
                React.createElement(VideoControls, { onToggleFullScreen: handleToggleFullScreen, onMoveVideoTo: setGoToTime }),
                React.createElement(Video, { goToTime: goToTime }))),
        React.createElement(Col, null,
            React.createElement(SubtitleSetting, null))));
};
//# sourceMappingURL=PageVideo.js.map
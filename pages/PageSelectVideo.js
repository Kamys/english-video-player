import { SelectFile } from '../components/SelectFile';
import { Button, Col, Row } from 'react-bootstrap';
import React, { useCallback } from 'react';
import { $sources } from '../store/sources';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { ROUTS } from '../utils';
export const PageSelectVideo = () => {
    const navigate = useNavigate();
    const { videoSrc } = useStore($sources.store);
    const handleSelectSubtitle = useCallback((langKey) => (link) => {
        $sources.action.onLoadSubtitle({ langKey, link });
    }, []);
    const handleSelectVideo = useCallback((link) => {
        $sources.action.onSetVideoSrc(link);
    }, []);
    const handleNext = useCallback(() => {
        navigate(ROUTS.VIDEO);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, null,
            React.createElement(Col, null,
                React.createElement("h3", null, "\u0412\u044B\u0431\u0438\u0440\u0435\u0442\u0435 \u0432\u0438\u0434\u0435\u043E \u0444\u0430\u0439\u043B \u0438 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u044B"))),
        React.createElement(Row, { className: "pt-2" },
            React.createElement(Col, { md: "6" },
                React.createElement(SelectFile, { label: '\u0412\u044B\u0431\u0438\u0440\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E', accept: "video/mp4,video/x-m4v,video/*,.mkv", onSelect: handleSelectVideo }),
                React.createElement(SelectFile, { label: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u044B \u0434\u043B\u044F \u0438\u043D\u043E\u0441\u0442\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430', accept: ".vtt,.srt", onSelect: handleSelectSubtitle('en') }),
                React.createElement(SelectFile, { label: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u044B \u0440\u043E\u0434\u043D\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430', accept: ".vtt,.srt", onSelect: handleSelectSubtitle('ru') }))),
        React.createElement(Row, null,
            React.createElement("p", null,
                "\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044B \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0439\u0442\u0438 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435",
                " ",
                React.createElement("a", { target: "_blank", href: 'https://www.opensubtitles.org/ru/search/sublanguageid-rus,eng' }, "Open Subtitles"))),
        React.createElement(Row, null,
            React.createElement(Button, { onClick: handleNext, disabled: !videoSrc }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"))));
};
//# sourceMappingURL=PageSelectVideo.js.map
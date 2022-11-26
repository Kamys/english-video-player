import React, { useCallback, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { SubtitleControl } from './SubtitleControl';
export const SubtitleSetting = () => {
    const [isShow, setIsShow] = useState(false);
    const [langKey, setLangKey] = useState("en");
    const handleClose = useCallback(() => {
        setIsShow(false);
        setLangKey("en");
    }, []);
    if (!isShow) {
        return (React.createElement(Button, { size: 'sm', onClick: () => setIsShow(true) }, "\u041E\u0442\u0441\u0442\u0430\u044E\u0442 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u044B"));
    }
    if (langKey === 'ru') {
        return (React.createElement(React.Fragment, null,
            React.createElement(Row, null,
                React.createElement(Col, null,
                    React.createElement("h4", null, "\u0412\u044B\u0431\u0435\u0440\u0435\u0442\u0435 \u043A\u0430\u043A\u0430\u044F \u0434\u043E\u0440\u043E\u0436\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u0435\u0439\u0447\u0430\u0441 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0440\u043E\u0434\u043D\u043E\u043C \u044F\u0437\u044B\u043A\u0435"),
                    React.createElement(SubtitleControl, { langKey: "ru" }))),
            React.createElement(Row, null,
                React.createElement(Button, { onClick: handleClose, className: "mt-1" }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, null,
            React.createElement(Col, null,
                React.createElement("h4", null, "\u0412\u044B\u0431\u0435\u0440\u0435\u0442\u0435 \u043A\u0430\u043A\u0430\u044F \u0434\u043E\u0440\u043E\u0436\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u0435\u0439\u0447\u0430\u0441 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0438\u043D\u043E\u0441\u0442\u0440\u0430\u043D\u043D\u043E\u043C \u044F\u0437\u044B\u043A\u0435"),
                React.createElement(SubtitleControl, { langKey: "en" }))),
        React.createElement(Row, null,
            React.createElement(Button, { onClick: () => setLangKey('ru'), className: "mt-1" }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"))));
};
//# sourceMappingURL=SubtitleSetting.js.map